import { useForm } from "@mantine/form";

export function useCreateGroupForm() {
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
  return form;
}
