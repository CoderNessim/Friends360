import { Container } from '@mantine/core';
import LoginRegisterHeader from './LoginRegisterHeader';
import LoginBody from './LoginBody';
import RegisterBody from './RegisterBody';

function LoginRegisterPage({ type }) {
  return (
    <Container size={420} my={70}>
      <LoginRegisterHeader type={type} />
      {type === 'login' ? <LoginBody /> : <RegisterBody />}
    </Container>
  );
}

export default LoginRegisterPage;
