export const getActivities = () => {
  return fetch('http://localhost:8080/activity')
    .then(res => res.json());
};
