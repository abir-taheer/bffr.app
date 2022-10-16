import Action from "./Action";
import Activity from "./Activity";
import Board from "./Board";
import Mutation from "./Mutation";
import Query from "./Query";
import User from "./User";

import { typeDefs as scalars } from "graphql-scalars";

const typeDefs = [Action, Activity, Board, Mutation, User, Query, ...scalars];

export default typeDefs;
