interface User {
  username: string;
  password: string;
}

const users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const getUserByUsername = (username: string) => {
  return users.find(user => user.username === username);
};
