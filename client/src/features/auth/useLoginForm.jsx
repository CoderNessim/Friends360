import { useForm } from '@mantine/form';

export async function useLoginForm() {
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

  return form;
}
