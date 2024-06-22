import {
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Anchor,
  Button,
  Loader,
} from '@mantine/core';
import { loginSignup } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from './useLoginForm';
import { useLoginQuery } from './useLoginQuery';

function LoginBody() {
  const form = useLoginForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginQuery();

  // async function handleSubmit(values) {
  //   try {
  //     const newUser = await loginSignup(values, 'login');
  //     toast.success(`Welcome back, ${newUser.data.user.username}!`);
  //     form.reset();
  //     navigate('/app/map');
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // }

  function handleSubmit(values) {
    mutate({ body: values, type: 'login' });
    form.reset();
  }

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Anchor
            component="button"
            size="sm"
            onClick={() => navigate('/forgotPassword')}
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          {isPending ? <Loader color='white' size={20} /> : 'Sign in'}
        </Button>
      </form>
    </Paper>
  );
}

export default LoginBody;
