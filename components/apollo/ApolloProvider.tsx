import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";
import { ReactNode, useMemo, useState } from "react";

const cache = new InMemoryCache();
const uri =
  typeof window === "undefined"
    ? "http://localhost:3000/api/graphql"
    : "/api/graphql";

const client = new ApolloClient({
  uri,
  cache,
  credentials: "include",
});

type ApolloProviderProps = {
  children: ReactNode;
};

export default function ApolloProvider({ children }: ApolloProviderProps) {
  return <Provider client={client}>{children}</Provider>;
}
