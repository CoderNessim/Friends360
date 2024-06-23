import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../../ui/Error';
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  Center,
  Loader,
  Space,
} from '@mantine/core';
import { useConfirmEmailQuery } from './useConfirmEmailQuery';

function ConfirmEmail() {
  const { confirmEmailToken } = useParams();

  const navigate = useNavigate();
  const { mutate, isPending, isError } = useConfirmEmailQuery();

  useEffect(() => {
    mutate({ token: confirmEmailToken });
  }, [mutate, confirmEmailToken]);

  if (isError) return <Error customErrorMessage={isError} />;

  return (
    <Container size={460} my={70}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Center>
          <Title align="center">Email Confirmation</Title>
        </Center>
        <Space h="md" />
        <Text color="dimmed" size="sm" align="center">
          {isPending
            ? 'Please wait while we confirm your email...'
            : 'Your email has been confirmed!'}
        </Text>
        <Space h="md" />
        <Center>
          {isPending ? (
            <Loader size="md" />
          ) : (
            <Button onClick={() => navigate('/app/map')}>Home page</Button>
          )}
        </Center>
      </Paper>
    </Container>
  );
}

export default ConfirmEmail;
