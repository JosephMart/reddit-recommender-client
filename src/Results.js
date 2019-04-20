import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'
import SimpleCard from './SimpleCard'
import Grid from '@material-ui/core/Grid'
import Loading from './Loading'

const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
});

function Results ({classes, data, isLoading, nsfw}) {
  if (isLoading) {
    return (
      <div className={classes.loading}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container>
        {data.map((sub, i) => (
          <Grid item key={sub.id} xs={12}>
            <Zoom in key={sub.id} style={{ transitionDelay: `${150 * i}ms`}}>
              <Paper elevation={4} className={classes.paper}>
                <SimpleCard {...sub} nsfw={nsfw} />
              </Paper>
            </Zoom>
          </Grid>
        ))}
        </Grid>
      </div>
    </div>
  )
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Results);