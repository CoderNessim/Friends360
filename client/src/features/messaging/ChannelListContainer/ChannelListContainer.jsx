import { ChannelList, useChatContext } from 'stream-chat-react';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import ChannelSearch from './ChannelSearch';
import { useState } from 'react';

function MessageHeader() {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Group Channels</p>
    </div>
  );
}

function customChannelTeamFilter(channels) {
  return channels.filter((channel) => channel.type === 'team');
}

function customChannelMessagingFilter(channels) {
  return channels.filter((channel) => channel.type === 'messaging');
}

function ChannelListContent({
  setIsCreating,
  setIsEditing,
  isCreating,
  setCreateType,
  setToggleContainer,
}) {
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID || ''] } };
  return (
    <>
      <div className="channel-list__list__wrapper">
        <MessageHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              isCreating={isCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              isCreating={isCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messaging"
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </div>
    </>
  );
}

function ChannelListContainer({ setCreateType, setIsCreating, setIsEditing }) {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#005fff',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((p) => !p)}
        >
          <ChannelListContent
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setCreateType={setCreateType}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  );
}

export default ChannelListContainer;
