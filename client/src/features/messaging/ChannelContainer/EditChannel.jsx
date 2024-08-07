import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../../../assets/CloseCreateChannel';
import UserList from './UserList';
import toast from 'react-hot-toast';

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

function EditChannel({ setIsEditing, group }) {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name || '');
  const [selectedUsers, setSelectedUsers] = useState([]);
  async function updateChannel(e) {
    e.preventDefault();
    try {
      const nameChanged =
        channelName !== (channel.data.name || channel.data.id);
      if (nameChanged) {
        await channel.update(
          {
            name: channelName,
            custom: { id: channel.data.metadata.groupId }, // Preserve custom data
          },
          { text: `Channel name changed to ${channelName}` }
        );
        toast.success('Channel updated successfully');
      }
      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
        toast.success('Members added successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Only the channel owner can update the channel');
    } finally {
      setChannelName('');
      setIsEditing(false);
      setSelectedUsers([]);
    }
  }

  async function leaveChannel(e) {
    e.preventDefault();
    try {
      await channel.removeMembers([channel._client.userID]);
      toast.success('Channel left successfully');
    } catch (err) {
      toast.error('An error occurred, please try again');
    }
  }

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} group={group} type="edit" />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
        <p onClick={leaveChannel}>Leave Group</p>
      </div>
    </div>
  );
}

export default EditChannel;
