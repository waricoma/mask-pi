import React, { useEffect, useState } from 'react';
import './App.css';
import { Typography, makeStyles, AppBar, Toolbar, Fab } from '@material-ui/core';
import { theme } from './materialui/theme';
import { MaskStatus } from './entity/MaskStatus';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

// 笑顔
// import MoodIcon from '@material-ui/icons/Mood';
// 嫌な顔
// import MoodBadIcon from '@material-ui/icons/MoodBad';
// 普通の顔
// import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { useGetMaskStatus } from './api/getMaskStatus';
import TempWidget from './components/TempWidget';
import HumWidget from './components/HumWidget';
import SmellWidget from './components/SmellWidget';
import UploadWidget from './components/UploadeWidget';
import { usePostMaskMode } from './api/postMaskMode';
import { MaskMode } from './entity/MaskMode';
import { usePostMaskImage } from './api/postMaskImage';
import { MaskImage } from './entity/MaskImage';

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
})

function App() {
  const classes = useStyles()
  const [status, setStatus] = useState<MaskStatus>({ temp: 0, hum: 0, smell: 0 })
  const [maskMode, setMaskMode] = useState<MaskMode>({ mode: 'image' })
  const getMaskStatusApiSet = useGetMaskStatus()
  const postMaskModeApiSet = usePostMaskMode()
  const postMaskImageApiSet = usePostMaskImage()

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Iot Mask
          </Typography>
        </Toolbar>
      </AppBar>
      <SmellWidget smell={status.smell} />
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
