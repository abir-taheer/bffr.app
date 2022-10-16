import { atom } from "jotai";
import User from "../../database/models/User";

const UserAtom = atom<User | null>(null);

export default UserAtom;