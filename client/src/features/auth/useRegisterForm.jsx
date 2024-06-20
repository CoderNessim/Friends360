import { useForm } from '@mantine/form';

export function useRegisterForm() {
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
      password: (val) => {
        if (val.length < 8) {
          return 'Password should include at least 8 characters';
        } else if (val.length > 20) {
          return 'Password should include less than 20 characters';
        } else {
          return null;
        }
      },
      phone: (val) =>
        /^\d+$/.test(val) && val.length >= 10 && val.length <= 15
          ? null
          : 'Invalid phone number',
      passwordConfirm: (val, values) =>
        val === values.password ? null : 'Passwords do not match',
      username: (val) => {
        if (val.length < 3) {
          return 'Username should include at least 3 characters';
        } else if (val.length > 20) {
          return 'Username should include less than 20 characters';
        } else {
          return null;
        }
      },
    },
  });

  return form;
}
