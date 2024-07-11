import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import { CloseCreateChannel } from '../../../assets/CloseCreateChannel';
import { useState } from 'react';
import toast from 'react-hot-toast';

function ChannelNameInput({ channelName = '', setChannelName }) {
  function handleChange(e) {
    e.preventDefault();
    setChannelName(e.target.value);
  }
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel name"
      />
      <p>Add Members</p>
    </div>
  );
}

function CreateChannel({ createType, setIsCreating }) {
  const [channelName, setChannelName] = useState('');
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

  async function createChannel(e) {
    e.preventDefault();
    if (!channelName) return;
    try {
      const newChannel = client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      await newChannel.watch();
      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  }
  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === 'team'
            ? 'Create a new Channel'
            : 'Send a Direct Message'}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
        </p>
      </div>
    </div>
  );
}

export default CreateChannel;
