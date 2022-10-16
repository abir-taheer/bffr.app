import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useRef } from "react";
import useGSI from "../../hooks/useGSI";
import { gql, useMutation } from "@apollo/client";
import { withApollo } from "@apollo/client/react/hoc";

const LOGIN_MUTATION = gql`
  mutation Login($idToken: JWT!) {
    login(token: $idToken) {
      id
    }
  }
`;

function LoginButton() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onSuccess = useCallback(
    async (token: string) => {
      if (token) {
        const res = await login({ variables: { idToken: token } });

        if (res.data.login.id) {
          window.location.reload()
        }
      }
    },
    [login]
  );

  const { ready } = useGSI({
    onSuccess,
  });

  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (ready && ref.current && globalThis?.google) {
      // @ts-ignore
      globalThis.google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
      });
    }
  });

  if (loading) {
    return <CircularProgress />;
  }

  return <div ref={ref} />;
}

export default LoginButton;
