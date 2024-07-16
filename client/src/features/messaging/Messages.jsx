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
import { useGroupProvider } from '../../context/GroupContext';

const streamApiKey = import.meta.env.VITE_STREAM_API;

const client = StreamChat.getInstance(streamApiKey);

function Messages() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { currentGroupIndex } = useGroupProvider();
  const { data: user, isPending: isUserPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => crudOperations('users', 'getMe', 'GET'),
  });

  const { data: groups, isPending: isGroupsPending } = useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
  });
  const streamToken = useLoaderData();
  connectUser(client, streamToken, user);

  if (isUserPending || isGroupsPending) return <CustomLoader />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isCreating={isCreating}
          setCreateType={setCreateType}
          group={groups[currentGroupIndex]}
        />
        <ChannelContainer
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isCreating={isCreating}
          isEditing={isEditing}
          createType={createType}
          user={user}
          group={groups[currentGroupIndex]}
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
