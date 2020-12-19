import React from 'react'
import { Typography, makeStyles, Box } from '@material-ui/core';
import Widget from './shared/Widget';
import { theme } from '../materialui/theme';

const useStyles = makeStyles({
  unit: {
    marginLeft: theme.spacing(1),
  }
})

type HumWidgetProps = {
  hum: number
}

const HumWidget: React.FC<HumWidgetProps> = (props) => {
  const classes = useStyles()

  return (
    <Widget
      title="humidity"
      body={
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h3">
            {props.hum}
          </Typography>
          <Typography className={classes.unit} variant="h6">
            %
          </Typography>
        </Box>
      }
    />
  )
}

export default HumWidget;
