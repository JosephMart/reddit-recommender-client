import React, { useEffect, useReducer, useState } from 'react'
import Typography from '@material-ui/core/Typography';

import './App.css'
import AutoSuggest from './AutoSuggest'
import { Button, withStyles } from '@material-ui/core'
import deburr from 'lodash/deburr'
import ChipsArray from './ChipsArray'
import ky from 'ky'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Results from './Results'
import { dataFetchReducer } from './utils'

// const suggestions = [
//   { label: 'webdev' },
//   { label: 'javascript' },
//   { label: 'programming' }
// ];

const styles = theme => ({
  root: {
    maxWidth: 2000,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 40,
    paddingRight: theme.spacing.unit * 40,
    margin: "auto"
  }
});

function App ({classes}) {
  const [data, updateData] = useState({result: []});
  const [query, updateQuery] = useState('');
  const [suggestions, updateSuggestions] = useState([]);
  const [payload, updatePayload] = useState({});
  const [nsfw, updateNSFW] = useState(false);

  const [suggestionStatus, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false
  });


  // Fetch related subreddits
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await ky.post(`http://localhost:8080${payload.url}`, {json: payload.data}).json();
        dispatch({ type: 'FETCH_SUCCESS' });
        console.log(result)
        updateData(result);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
        console.error(error);
      }
    };

    if (payload.url !== null && payload.url !== undefined)
      fetchData();
  }, [payload]);


  const [chips, updateChips] = useState([]);
  // Add a card
  const suggestionSelected = suggestion => {
    updateChips([...chips, {...suggestion, key: suggestion.label}]);
  };

  // delete a chip
  const handleDelete = data => () => {
    const chipData = [...chips];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    updateChips(chipData);
    updateData({result: []});
  };

  const onSubmit = () => {
    updatePayload({url: '/search', data: {subreddits: chips.map(i => i.label)}});
  };

  const getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if (inputLength === 0) {
      return [];
    }

    const fetchData = async () => {
      try {
        const result = await ky.get(`http://localhost:8080/autocomplete?q=${inputValue}&over18=${nsfw}`).json();
        return result;
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(({results}) => results.map(i => ({label: i[0], key: i[0]})))
      .then(suggestions => (
        suggestions.filter(suggestion => {
          const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }
          return keep;
        }))
      ).then(updateSuggestions);
  };
  // console.log(suggestionStatus)
  return (
    <section id="Main" className={classes.root}>
      <Typography component="h2" variant="h1" gutterBottom align='center'>
        Subreddit Recommender
      </Typography>
      <AutoSuggest suggestions={suggestions} getSuggestions={getSuggestions} suggestionSelected={suggestionSelected} query={query} handleChange={updateQuery} updateSuggestions={updateSuggestions} />
      <ChipsArray chips={chips} handleDelete={handleDelete} />
      <Button onClick={onSubmit}>Submit</Button>
      <FormControlLabel
        control={
          <Switch
            checked={nsfw}
            onChange={e => updateNSFW(!nsfw)}
            value="checkedB"
            color="primary"
          />
        }
        label="NSFW"
      />
      <Results data={data.result} isLoading={suggestionStatus.isLoading} nsfw={nsfw}/>
    </section>
  )
}

export default withStyles(styles)(App);
