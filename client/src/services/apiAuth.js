export async function loginSignup(body, type) {
  const response = await fetch(`http://localhost:3000/api/users/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  const data = await response.json();
  return data;
}

export async function confirmEmail(token) {
  const response = await fetch(
    `http://localhost:3000/api/users/confirmEmail/${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  // const data = await response.json();
  // return data;
}

export async function resetPassword(body, token) {
  const response = await fetch(
    `http://localhost:3000/api/users/resetPassword/${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
}
