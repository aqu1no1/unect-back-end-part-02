import IUser from "./User.model";

interface IPet {
  name: string;
  age: number;
  weight: number;
  color: string;
  available: boolean;
  user: IUser;
  adopter?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IPet;
