export const getUsers = () => {
  return fetch('http://localhost:8080/user')
    .then(res => res.json());
};

export const updateUser = (user) => {
  return fetch(`http://localhost:8080/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json());
};
