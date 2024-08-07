import { Channel, Message } from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';

function ChannelContainer({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
  user,
  group,
}) {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel
          createType={createType}
          setIsCreating={setIsCreating}
          group={group}
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} group={group} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel EmptyStateIndicator={EmptyState}>
        <Message message={{ user }} />
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
