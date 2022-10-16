import { gql, useQuery } from "@apollo/client";
import { ReactNode, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import FlexCenter from "../ui/FlexCenter";
import { useAtom } from "jotai";
import UserAtom from "./User";

type AuthProviderProps = {
  children: ReactNode;
};

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      id
      firstName
      lastName
    }
  }
`;

export default function AuthProvider(props: AuthProviderProps) {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const { children } = props;
  const [_, setUser] = useAtom(UserAtom);

  useEffect(() => {
    setUser(data?.authenticatedUser || null);
  }, [setUser, data]);

  if (loading) {
    return (
      <FlexCenter fullPage>
        <CircularProgress />
      </FlexCenter>
    );
  }

  return children;
}
