import { ChannelList, ChannelSearch, useChatContext } from 'stream-chat-react';
import Cookies from 'js-cookie';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';


function MessageHeader() {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Your Group Channels</p>
    </div>
  );
}

function ChannelListContainer() {
  return (
    <>
      <div className="channel-list__list__wrapper">
        <MessageHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
}

export default ChannelListContainer;
