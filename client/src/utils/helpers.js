import toast from "react-hot-toast";

export async function handleAsyncSubmit(asyncFunction, form, values) {
  try {
    await asyncFunction;
    toast.success(`An email has been sent to ${values.email}!`);
    form.reset();
  } catch (err) {
    toast.error(err.message);
  }
}
