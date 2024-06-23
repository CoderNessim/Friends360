import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/apiUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomLoader from './CustomLoader';

function Protect({ children }) {
  const navigate = useNavigate();
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (!user) {
    toast.error('Please login to access this page');
    navigate('/login');
  }

  return (
    <>
      {children}
      {isPending && <CustomLoader size="lg" />}
    </>
  );
}

export default Protect;
