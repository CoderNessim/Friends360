export async function createGroup(body) {
  const response = await fetch(`http://localhost:3000/api/groups/createGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  const data = await response.json();
  return data;
}