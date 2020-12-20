import React from 'react'
import { Typography } from '@material-ui/core';
import Widget from './shared/Widget';

// 笑顔
import MoodIcon from '@material-ui/icons/Mood';
// 嫌な顔
import MoodBadIcon from '@material-ui/icons/MoodBad';

type SmellWidgetProps = {
  smell: number
  smellThreshold: number
}

const SmellWidget: React.FC<SmellWidgetProps> = (props) => {

  return (
    <Widget
      title="Smell"
      body={
        <>
          <Typography variant="h3">
            {props.smell}
          </Typography>
          {
            props.smell < props.smellThreshold ?
              <MoodBadIcon style={{ color: 'red', fontSize: 40 }} />
              :
              <MoodIcon style={{ color: 'blue', fontSize: 40 }} />
          }
        </>
      }
    />
  )
}

export default SmellWidget;
