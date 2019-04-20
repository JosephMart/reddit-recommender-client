import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea'
import { numberWithCommas } from './utils'

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const goTo = () => {
    window.open(`https://www.reddit.com/r/${props.display_name}`, '_blank');
  }

  if (!props.nsfw && props.over18) {
    return null;
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={goTo}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography color="textSecondary">
          {`r/${props.display_name}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${numberWithCommas(props.subscribers)} subscribers`}
        </Typography>
        <Typography component="p">
          {props.description}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
