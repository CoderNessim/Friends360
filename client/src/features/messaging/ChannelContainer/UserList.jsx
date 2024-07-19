import { Avatar, useChatContext } from 'stream-chat-react';
import { InviteIcon } from '../../../assets/InviteIcon';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { crudOperations } from '../../../utils/helpers';
import CustomLoader from '../../../ui/CustomLoader';

function ListContainer({ children }) {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
}

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

function UserList({ setSelectedUsers, group, type = '' }) {
  const { client, channel } = useChatContext();
  const { data: allGroups, isPending } = useQuery({
    queryKey: ['groups'],
    queryFn: () => crudOperations('groups', 'getGroups', 'GET'),
  });
  const teamChannelGroup = allGroups.find(
    (group) => group?.id === channel?.data?.metadata?.groupId
  );

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    async function getUsers() {
      if (loading || !client.userID) return; // Check if client.userID is set
      setLoading(true);
      try {
        //if we are editing a channel, we want to display the users who are a part of the group associated with the channel
        //otherwise we want to display the users in the current group rather than the channel that was made with a specific group
        const memberIDs =
          type === 'edit'
            ? teamChannelGroup.members.filter((id) => id !== client.userID)
            : group.members.filter((id) => id !== client.userID);
        const response = await client.queryUsers(
          {
            id: { $in: memberIDs },
          },
          { id: 1 }
        );
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (client) getUsers();
  }, []);
  if (isPending) return <CustomLoader />;
  if (error)
    return (
      <ListContainer>
        <div className="user-list__message">
          There are no users in{' '}
          {type === 'edit' ? (
            <strong>{teamChannelGroup.name}</strong>
          ) : (
            <strong>{group.name}</strong>
          )}
          , invite users to be able to start a chat
        </div>
      </ListContainer>
    );

  if (listEmpty)
    return (
      <ListContainer>
        <div className="user-list__message">No users found</div>
      </ListContainer>
    );

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            key={user.id}
            user={user}
            index={i}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
}

export default UserList;
