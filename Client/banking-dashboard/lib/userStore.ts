interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};
