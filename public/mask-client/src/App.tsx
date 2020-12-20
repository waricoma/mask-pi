import React, { useEffect, useState } from 'react';
import './App.css';
import { Typography, makeStyles, AppBar, Toolbar, Fab, IconButton } from '@material-ui/core';
import { theme } from './materialui/theme';
import { MaskStatus } from './entity/MaskStatus';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import SettingsIcon from '@material-ui/icons/Settings';

import { useGetMaskStatus } from './api/getMaskStatus';
import TempWidget from './components/TempWidget';
import HumWidget from './components/HumWidget';
import SmellWidget from './components/SmellWidget';
import UploadWidget from './components/UploadeWidget';
import { usePostMaskMode } from './api/postMaskMode';
import { MaskMode } from './entity/MaskMode';
import { usePostMaskImage } from './api/postMaskImage';
import { MaskImage } from './entity/MaskImage';
import SettingsDialog from './components/SettingsDialog';
import { getSettings, saveSettings } from './utils/SettingsStorage';



const useStyles = makeStyles({
  root: {
    backgroundColor: '#eff0f3',
    height: '100vh'
  },
  title: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: "translate(-50%, 0)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
})

function App() {
  const classes = useStyles()
  const [status, setStatus] = useState<MaskStatus>({ temp: 0, hum: 0, smell: 0 })
  const [maskMode, setMaskMode] = useState<MaskMode>({ mode: 'image' })
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [smellThreshold, setSmellThreshold] = useState<number>(getSettings('smell'))
  // const [tempThreshold, setTempThreshold] = useState<number>(20)
  // const [humThreshold, setHumThreshold] = useState<number>(20)
  const getMaskStatusApiSet = useGetMaskStatus()
  const postMaskModeApiSet = usePostMaskMode()
  const postMaskImageApiSet = usePostMaskImage()

  const handleChangeSmellThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSmellThreshold(Number(event.target.value))
  }
  // const handleChangeTempThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTempThreshold(Number(event.target.value))
  // }
  // const handleChangeHumThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setHumThreshold(Number(event.target.value))
  // }

  const handleClickMicButton = () => {
    if (maskMode.mode === 'image') {
      postMaskModeApiSet.execute({ mode: 'voice' })
    } else if (maskMode.mode === 'voice') {
      postMaskModeApiSet.execute({ mode: 'image' })
    }
  }

  const handleUploadImage = (maskImage: MaskImage) => {
    postMaskImageApiSet.execute(maskImage)
    setMaskMode({ mode: 'image' })
  }

  const handleClickSettingsIcon = () => {
    setOpenSettings(!openSettings)
  }

  const handleCloseSettingsDialog = () => {
    setOpenSettings(false)
  }

  useEffect(() => {
    setInterval(() => {
      getMaskStatusApiSet.execute();
    }, 1000)
  }, []);

  useEffect(() => {
    setStatus(getMaskStatusApiSet.response)
  }, [getMaskStatusApiSet.response])

  useEffect(() => {
    setMaskMode(postMaskModeApiSet.response)
  }, [postMaskModeApiSet.response])

  useEffect(() => {
    saveSettings('smell', smellThreshold)
  }, [smellThreshold])

  return (
    <div className={classes.root}>
      <SettingsDialog
        open={openSettings}
        onClose={handleCloseSettingsDialog}
        smellThreshold={smellThreshold}
        onChangeSmellThreshold={handleChangeSmellThreshold}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickSettingsIcon}
          >
            <SettingsIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Iot Mask
          </Typography>
        </Toolbar>
      </AppBar>
      <SmellWidget smell={status.smell} smellThreshold={smellThreshold} />
      <TempWidget temp={status.temp} />
      <HumWidget hum={status.hum} />
      <UploadWidget onUploadImage={handleUploadImage} />
      <Fab
        className={classes.fab}
        color={maskMode.mode === 'voice' ? "primary" : "default"}
        aria-label="add"
        onClick={handleClickMicButton}
      >
        {maskMode.mode === 'voice' ? <MicIcon /> : <MicOffIcon />}
      </Fab>
    </div>
  );
}

export default App;
