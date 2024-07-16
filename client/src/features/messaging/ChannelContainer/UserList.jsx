import { Avatar, useChatContext } from 'stream-chat-react';
import { InviteIcon } from '../../../assets/InviteIcon';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

function UserList({ setSelectedUsers, group }) {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getUsers() {
      if (loading || !client.userID) return; // Check if client.userID is set
      setLoading(true);
      try {
        const memberIDs = group.members.filter((id) => id !== client.userID);
        const response = await client.queryUsers(
          {
            //FIXME: edit this
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
  if (error)
    return (
      <ListContainer>
        <div className="user-list__message">
          There are no users in <strong>{group.name}</strong>, invite users to
          be able to start a chat
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
