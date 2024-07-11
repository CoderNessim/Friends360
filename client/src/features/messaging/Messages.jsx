import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useLoaderData } from 'react-router-dom';
import ChannelListContainer from './ChannelListContainer/ChannelListContainer';
import { connectUser, crudOperations } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import CustomLoader from '../../ui/CustomLoader';
import ChannelContainer from './ChannelContainer/ChannelContainer';
import { useState } from 'react';

import './Messaging.css';
import 'stream-chat-react/dist/css/index.css';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Messages() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);

  if (isPending) return <CustomLoader />;

  return (
    <div className="app__wrapper">
      <Chat client={client}>
        <ChannelListContainer
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isCreating={isCreating}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isCreating={isCreating}
          isEditing={isEditing}
          createType={createType}
          user={user}
        />
      </Chat>
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
