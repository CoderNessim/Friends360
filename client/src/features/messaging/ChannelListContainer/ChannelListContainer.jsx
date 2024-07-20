import { ChannelList, useChatContext } from 'stream-chat-react';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import ChannelSearch from './ChannelSearch';
import { useEffect, useRef, useState } from 'react';
import CustomLoader from '../../../ui/CustomLoader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGroupProvider } from '../../../context/GroupContext';
import { useGetGroups } from '../../../hooks/useGetGroups';

const ChannelHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Channels</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

function ChannelListContent({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) {
  const navigate = useNavigate();
  const { client } = useChatContext();
  const { currentGroupIndex } = useGroupProvider();
  //must fetch the data again in this component since it becomes undefined when i try to pass it down as props
  const { groups, isGroupsPending } = useGetGroups();
  const errorShownRef = useRef(false);

  useEffect(() => {
    if (
      !groups[currentGroupIndex] &&
      !errorShownRef.current &&
      !isGroupsPending
    ) {
      navigate('/app/groups');
      toast.error('You need to be in a group to access this feature');
      errorShownRef.current = true; // Set the ref to true to prevent further toasts
    }
  }, [groups, navigate, currentGroupIndex, isGroupsPending]);

  if (isGroupsPending) return <CustomLoader />;

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <div className="channel-list__list__wrapper">
        <ChannelHeader />
        <ChannelSearch
          setToggleContainer={setToggleContainer}
          group={groups[currentGroupIndex]?.members}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
}

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#005fff',
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
