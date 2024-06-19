import { Title, Text, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function LoginRegisterHeader({ type }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(type === 'login' ? '/register' : '/login');
  }

  return (
    <>
      <Title ta="center" style={{ whiteSpace: 'nowrap' }}>
        {type === 'login' ? 'Welcome back!' : 'Welcome to Friends360!'}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {type === 'login'
          ? 'Do not have an account yet? '
          : 'Already have an account? '}
        <Anchor size="sm" component="button" onClick={handleNavigate}>
          {type === 'login' ? 'Sign up' : 'Sign in'}
        </Anchor>
      </Text>
    </>
  );
}

export default LoginRegisterHeader;
