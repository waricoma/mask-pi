import React, { ReactNode } from 'react'
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';
import { theme } from '../../materialui/theme';

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
  },
  inner: {
    padding: 10,
  },
})

type WidgetProps = {
  title?: ReactNode
  body: ReactNode
}

const Widget: React.FC<WidgetProps> = (props) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Paper className={classes.inner}>
        {props.title &&
          <Typography variant="h6">
            {props.title}
          </Typography>
        }
        {props.body}
      </Paper>
    </Container>
  )
}

export default Widget;
