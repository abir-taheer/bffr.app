import User from "../../../database/models/User";

type UserByIdArgs = {
  id: number;
};

const userById = (parent: null, { id }: UserByIdArgs): Promise<User | null> =>
  User.findOne({ where: { id } });

export default userById;
