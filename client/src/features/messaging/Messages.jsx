import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import ChannelListContainer from './ChannelListContainer';
import ChannelContainer from './ChannelContainer';
import './Messaging.css';
import { crudOperations } from '../../utils/helpers';

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

// eslint-disable-next-line react-refresh/only-export-components
export async function messageLoader() {
  const streamToken = await crudOperations('users', 'streamToken', 'GET');
  console.log(streamToken);
  return streamToken;
}

export default Messages;
