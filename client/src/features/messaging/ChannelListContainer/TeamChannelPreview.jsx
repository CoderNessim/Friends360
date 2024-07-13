import { Avatar, useChatContext } from 'stream-chat-react';

function TeamChannelPreview({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) {
  const { channel: activeChannel, client } = useChatContext();
console.log(channel.state.members)
  function ChannelPreview() {
    return (
      <p className="channel-preview__item">
        # {channel?.data?.name || 'Channel'}
      </p>
    );
  }

  function DirectPreview() {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  }

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((p) => !p);
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
}

export default TeamChannelPreview;
