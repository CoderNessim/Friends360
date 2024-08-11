import { AddChannel } from '../../../assets/AddChannel';
import { DEACTIVATED_USER_CODE } from '../../../utils/helpers';

function TeamChannelList({
  children,
  error = false,
  loading,
  type,
  setIsCreating,
  setIsEditing,
  isCreating,
  setCreateType,
  setToggleContainer,
}) {
  
  if (error && error.code !== DEACTIVATED_USER_CODE) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    ) : null;
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          isCreating={isCreating}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  );
}

export default TeamChannelList;
