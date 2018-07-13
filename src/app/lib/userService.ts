export const getUsers = () => {
  return fetch('http://localhost:8080/users')
    .then(res => res.json());
};

export const updateUser = (user) => {
  return fetch(`http://localhost:8080/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json());
};
