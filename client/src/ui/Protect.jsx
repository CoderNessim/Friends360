import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/apiUser';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function Protect({ children }) {
  const navigate = useNavigate();
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  if (isPending) return <Loader />;

  if (!user) {
    toast.error('Please login to access this page');
    navigate('/login');
  }

  return children;
}

export default Protect;
