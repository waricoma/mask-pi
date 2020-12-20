import React from 'react'
import { Typography, Box, makeStyles } from '@material-ui/core';
import Widget from './shared/Widget';

// 笑顔
import MoodIcon from '@material-ui/icons/Mood';
// 嫌な顔
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { theme } from '../materialui/theme';

const useStyles = makeStyles({
  score: {
    marginRight: theme.spacing(1)
  },
  goodStateContainer: {
    color: 'blue',
    display: 'flex',
    alignItems: 'center'
  },
  badStateContainer: {
    color: 'red',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  }
})

type SmellWidgetProps = {
  smell: number
  smellThreshold: number
}

const SmellWidget: React.FC<SmellWidgetProps> = (props) => {
  const classes = useStyles()


  console.log('thre', props.smellThreshold)
  console.log('boolean', props.smell < props.smellThreshold)


  return (
    <Widget
      title="Smell"
      body={
        <Box display="flex">
          <Typography variant="h3" className={classes.score}>
            {props.smell}
          </Typography>
          {
            props.smell < props.smellThreshold ?
              <div className={classes.badStateContainer}>
                <MoodBadIcon className={classes.icon} />
                <Typography variant="h5">bad</Typography>
              </div>
              :
              <div className={classes.goodStateContainer}>
                <MoodIcon className={classes.icon} />
                <Typography variant="h5">good</Typography>
              </div>
          }
        </Box>
      }
    />
  )
}

export default SmellWidget;
