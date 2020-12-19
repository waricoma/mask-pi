import React from 'react'
import { Typography, makeStyles, Box } from '@material-ui/core';
import Widget from './shared/Widget';
import { theme } from '../materialui/theme';

const useStyles = makeStyles({
  unit: {
    marginLeft: theme.spacing(1),
  }
})

type TempWidgetProps = {
  temp: number
}

const TempWidget: React.FC<TempWidgetProps> = (props) => {
  const classes = useStyles()

  return (
    <Widget
      title="Temperature"
      body={
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h3">
            {props.temp}
          </Typography>
          <Typography className={classes.unit} variant="h6">
            °C
          </Typography>
        </Box>
      }
    />
  )
}

export default TempWidget;
