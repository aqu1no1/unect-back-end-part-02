interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
