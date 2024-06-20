import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { loginSignup } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  async function handleSubmit(values) {
    try {
      await loginSignup(values, 'forgotPassword');
      toast.success(`An email has been sent to ${values.email}!`);
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container size={460} my={70}>
      <Title ta="center">Forgot your password?</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="Your email"
            required
            {...form.getInputProps('email')}
            error={form.errors.email}
          />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5} onClick={() => navigate('/login')}>
                  Back to the login page
                </Box>
              </Center>
            </Anchor>
            <Button type="submit">Reset password</Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
