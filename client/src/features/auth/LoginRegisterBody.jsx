import {
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Anchor,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

function LoginBody() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length >= 8
          ? null
          : 'Password should include at least 8 characters',
    },
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Email"
          placeholder="Your email"
          required
          {...form.getInputProps('email')}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </Paper>
  );
}

export default LoginBody;
