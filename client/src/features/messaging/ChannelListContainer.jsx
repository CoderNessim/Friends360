import { ChannelList, useChatContext } from 'stream-chat-react';
// import {
//   ChannelSearch,
//   TeamChannelList,
//   TeamChannelPreview,
// } from 'stream-chat-react';
import Cookies from 'js-cookie';
import '../../App.css';

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
      </div>
    </>
  );
}

export default ChannelListContainer;
