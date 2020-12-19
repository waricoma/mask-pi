import React from 'react'
import { Typography, makeStyles, Box } from '@material-ui/core';
import Widget from './shared/Widget';
import { theme } from '../materialui/theme';

type SmellWidgetProps = {
  smell: number
}

const SmellWidget: React.FC<SmellWidgetProps> = (props) => {
  return (
    <Widget
      title="Smell"
      body={
        <Typography variant="h3">
          {props.smell}
        </Typography>
      }
    />
  )
}

export default SmellWidget;
