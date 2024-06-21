import {
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../services/apiAuth';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();
  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (val) =>
        val.length >= 8
          ? null
          : 'Password should include at least 8 characters',
    },
  });

  async function handleSubmit(values) {
    try {
      await resetPassword(values, resetPasswordToken);
      toast.success('Password has been successfully reset');
      navigate('/app/map');
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container size={460} my={70}>
      <Title ta="center">Password reset</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter a new password to reset your old one
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <PasswordInput
            label="New password"
            placeholder="Your new password"
            required
            {...form.getInputProps('password')}
            error={form.errors.password}
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
            <Button type="submit">Confirm password</Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
