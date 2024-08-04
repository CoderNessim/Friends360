import toast from 'react-hot-toast';

const serverPort = import.meta.env.VITE_SERVER_PORT;

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
      body:
        operation === 'POST' || operation === 'PATCH'
          ? JSON.stringify(body)
          : undefined,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  if (operation === 'DELETE') return;

  const data = await response.json();
  if (type === 'users' && endPoint === 'getMe') {
    delete data.data.data.groups;
    delete data.data.data.invites;
  }

  if (endPoint === 'streamToken') return data.streamToken;

  if (endPoint === 'getInvites') {
    return data.data;
  }

  return data.data.data;
}

export function connectUser(client, streamToken, user) {
  if (streamToken) {
    client.connectUser(
      {
        id: user.id,
        name: user.username,
        fullName: user.username,
        phoneNumber: user.phone,
        image: user.photo,
        token: streamToken,
      },
      streamToken
    );
  }
}

export function getPhotoUrl(photo) {
  const imageUrl = `http://localhost:${serverPort}${photo}`;
  return imageUrl;
}
