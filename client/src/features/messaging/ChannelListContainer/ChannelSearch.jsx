import { useState, useEffect } from 'react';
// import { SearchIcon } from '../../../assets/SearchIcon';
import toast from 'react-hot-toast';

function ChannelSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  async function getChannels(text) {
    try {
      //TODO: FETCH CHANNELS
    } catch (err) {
      toast.error('Error searching channels');
      setQuery('');
    }
  }

  function onSearch(event) {
    event.preventDefault();
    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  }

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-serach__input__icon">
          {/* <SearchIcon /> */}
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
}

export default ChannelSearch;
