import toast from 'react-hot-toast';

export async function handleAsyncSubmit(asyncFunction, form, values) {
  try {
    await asyncFunction;
    toast.success(`An email has been sent to ${values.email}!`);
    form.reset();
  } catch (err) {
    toast.error(err.message);
  }
}

export async function crudOperations(
  type,
  endPoint,
  operation,
  body = {},
  param = ''
) {
  if (param) endPoint += `/${param}`;

  const response = await fetch(
    `http://localhost:3000/api/${type}/${endPoint}`,
    {
      method: operation,
      headers: {
        'Content-Type': 'application/json',
      },
      body: operation === 'POST' ? JSON.stringify(body) : undefined,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  if (operation === 'DELETE') return;

  const data = await response.json();
  if (type === 'users') delete data.data.data.groups;

  return data.data.data;
}
