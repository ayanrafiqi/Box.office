import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      //console.log(result);
    });
  };
  // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
  const onInputChange = ev => {
    setInput(ev.target.value);
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results Found</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
      //results.map(item => <div key={item.show.id}>{item.show.name}</div>)
      //results.map(item => (
      //  <div key={item.person.id}>{item.person.name}</div>
      //) );
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for Something?"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
