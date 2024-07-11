import { Avatar } from 'stream-chat-react';
import { InviteIcon } from '../../../assets/InviteIcon';
import { useEffect, useState } from 'react';

function ListContainer({ children }) {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <InviteIcon />
      </div>
      {children}
    </div>
  );
}

function UserItem() {
  return (
    <div className="user-item__wrapper">
      <div className="user-item__name-wrapper">
        <Avatar />
      </div>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, [])

  return <ListContainer>userlist</ListContainer>;
}

export default UserList;
