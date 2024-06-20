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
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const navigate = useNavigate();
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

  // async function handleSubmit(values) {
  //   try {
  //     await loginSignup(values, 'forgotPassword');
  //     toast.success(`An email has been sent to ${values.email}!`);
  //     form.reset();
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // }

  return (
    <Container size={460} my={70}>
      <Title ta="center">Password reset</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter a new password to reset your old one
      </Text>
      <form>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <PasswordInput
            label="New password"
            placeholder="Your new password"
            required
            {...form.getInputProps('pasword')}
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
