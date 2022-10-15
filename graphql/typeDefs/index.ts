import Mutation from "./Mutation";
import Query from "./Query";
import User from "./User";
import {typeDefs as scalars} from "graphql-scalars";

const typeDefs = [Mutation, User, Query, ...scalars];

export default typeDefs;
