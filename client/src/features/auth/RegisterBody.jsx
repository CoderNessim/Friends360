import { Paper, TextInput, PasswordInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signup } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function RegisterBody() {

  async function handleSubmit(values) {
    try {
      const newUser = await signup(values);
      const username = newUser.data.user.username;
      toast.success(
        `Welcome, ${username}! Please confirm your email at ${newUser.data.user.email}.`
      );
    } catch (err) {
      toast.error(err.message);
    }
  }

  const form = useForm({
    initialValues: {
      username: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length >= 8
          ? null
          : 'Password should include at least 8 characters',
      phone: (val) =>
        /^\d+$/.test(val) && val.length >= 10 && val.length <= 15
          ? null
          : 'Invalid phone number',
      passwordConfirm: (val, values) =>
        val === values.password ? null : 'Passwords do not match',
    },
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            {...form.getInputProps('username')}
          />
          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            required
            {...form.getInputProps('phone')}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Password Confirm"
            placeholder="Confirm your password"
            required
            {...form.getInputProps('passwordConfirm')}
          />
        </Stack>
        <Button fullWidth mt="xl" type="submit">
          Sign up
        </Button>
      </form>
    </Paper>
  );
}

export default RegisterBody;
