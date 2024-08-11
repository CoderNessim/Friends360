import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DEACTIVATED_USER_CODE } from '../utils/helpers';

function useGetUserGroups(userId, client) {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGroups() {
      setIsLoading(true);
      try {
        const filter = { members: { $in: [userId] } };
        const channels = await client.queryChannels(filter);

        setGroups(channels);
      } catch (err) {
        if (err.code !== DEACTIVATED_USER_CODE) {
          setError(err);
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroups();
  }, [userId]);

  return { groups, isLoading, error };
}

export default useGetUserGroups;
