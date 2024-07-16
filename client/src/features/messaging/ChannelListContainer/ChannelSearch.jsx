import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useChatContext } from 'stream-chat-react';
import ResultsDropdown from './ResultsDropdown';

const ChannelSearch = ({ setToggleContainer, group }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    if (!text || !/^[a-zA-Z0-9]+$/.test(text)) {
        setLoading(false);
        return;
      }
    try {
      const memberIDs = group.members.concat(client.userID);
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      let userResponse = { users: [] };
      const filteredMemberIDs = memberIDs.filter((id) => id !== client.userID);

      if (filteredMemberIDs.length > 0) {
        userResponse = await client.queryUsers({
          id: { $in: filteredMemberIDs }, // Include only IDs in memberIDs excluding client.userID
          name: { $autocomplete: text },
        });
      }

      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);
      console.log(channels, users);
      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('');
      toast.error('Error fetching channels or users');
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-serach__input__icon"></div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
