import { useForm } from '@mantine/form';

export function useInviteForm() {
  const form = useForm({
    initialValues: {
      username: '',
    },
    validate: {
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
