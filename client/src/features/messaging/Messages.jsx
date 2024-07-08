import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import ChannelListContainer from './ChannelListContainer';
import ChannelContainer from './ChannelContainer';
import '../../App.css';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Messages() {
  return (
    <div className="app__wrapper">
      <Chat client={client}></Chat>
      <ChannelListContainer />
      <ChannelContainer />
    </div>
  );
}

export default Messages;
