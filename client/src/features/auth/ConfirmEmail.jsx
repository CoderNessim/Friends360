import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmEmail } from '../../services/apiAuth';
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
import toast from 'react-hot-toast';

function ConfirmEmail() {
  const { confirmEmailToken } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function confirmEmailFunc() {
      try {
        setIsLoading(true);
        await confirmEmail(confirmEmailToken);
        navigate('/app/map');
        toast.success('Email has been confirmed');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    confirmEmailFunc();
  }, [confirmEmailToken, navigate]);

  if (error) return <Error customErrorMessage={error} />;

  return (
    <Container size={460} my={70}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Center>
          <Title align="center">Email Confirmation</Title>
        </Center>
        <Space h="md" />
        <Text color="dimmed" size="sm" align="center">
          {isLoading
            ? 'Please wait while we confirm your email...'
            : 'Your email has been confirmed!'}
        </Text>
        <Space h="md" />
        <Center>
          {isLoading ? (
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
