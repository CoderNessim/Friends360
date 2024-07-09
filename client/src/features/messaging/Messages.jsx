import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useLoaderData } from 'react-router-dom';
import ChannelListContainer from './ChannelListContainer';
import ChannelContainer from './ChannelContainer';
import './Messaging.css';
import { crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import CustomLoader from '../../ui/CustomLoader';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Messages() {
  const streamToken = useLoaderData();
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  if (isPending) return <CustomLoader />;

  if (streamToken) {
    client.connectUser(
      {
        id: user.id,
        username: user.username,
        phone: user.phone,
        photo: user.photo,
        token: streamToken,
      },
      streamToken
    );
  }

  console.log(user);
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
  try {
    const streamToken = await crudOperations('users', 'streamToken', 'GET');
    return streamToken;
  } catch (err) {
    toast.error(err.message || 'Something went wrong');
  }
}

export default Messages;
