import User from "../../../database/models/User";

type CreateUserArgs = {
  email: string;
  firstName: string;
  lastName: string;
};

const createUser = (
  parent: null,
  { email, firstName, lastName }: CreateUserArgs
): Promise<User> => User.create({ email, firstName, lastName });

export default createUser;
