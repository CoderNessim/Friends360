import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import { CloseCreateChannel } from '../../../assets/CloseCreateChannel';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGroupProvider } from '../../../context/GroupContext';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating, group }) => {
  const { client, setActiveChannel, channel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');
  const createChannel = async (e) => {
    e.preventDefault();
    if (!channelName && createType === 'team') return;
    try {
      const newChannel = client.channel(createType, channelName, {
        name: `${channelName} (Group: ${group.name})`,
        members: selectedUsers,
        metadata: {
          // Assuming custom data is stored in 'metadata'
          groupId: group.id, // Store custom group ID here
        },
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      toast.error('Channel creation failed. Please try again.');
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === 'team'
            ? 'Create a New Channel'
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
      <UserList setSelectedUsers={setSelectedUsers} group={group} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
