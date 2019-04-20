import React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

function ChipsArray (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      {props.chips.map(data => (
        <Chip
          key={data.key}
          label={data.label}
          onDelete={props.handleDelete(data)}
          className={classes.chip}
        />
      ))}
    </div>
  )
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);