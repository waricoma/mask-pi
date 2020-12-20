import React from "react";
import { Dialog, DialogTitle, TextField, makeStyles } from "@material-ui/core";
import { theme } from "../../materialui/theme";



const useStyles = makeStyles({
  inputField: {
    margin: theme.spacing(2),
  },
})

type SettingsDialogProps = {
  open: boolean
  onClose: () => void
  smellThreshold: number
  onChangeSmellThreshold: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: SettingsDialogProps) => {
  const classes = useStyles()

  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Settings</DialogTitle>
      <TextField
        className={classes.inputField}
        type="number" id="smell-threshold"
        label="Smell Threshold" value={props.smellThreshold}
        onChange={props.onChangeSmellThreshold}
      />
      {/* <TextField
        className={classes.inputField}
        type="number"
        id="temp-threshold"
        label="TempThreshold"
        value={tempThreshold}
        onChange={handleChangeTempThreshold}
      />
      <TextField
        className={classes.inputField}
        type="number"
        id="hum-threshold"
        label="hum Threshold"
        value={humThreshold}
        onChange={handleChangeHumThreshold}
      /> */}
    </Dialog>
  )
}
