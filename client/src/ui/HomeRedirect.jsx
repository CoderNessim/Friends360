import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);
  return <div></div>;
}

export default HomeRedirect;
