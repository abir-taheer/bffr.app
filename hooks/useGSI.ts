// @ts-nocheck
import { gql, useMutation } from "@apollo/client";
import { useCallback, useContext, useEffect, useState } from "react";
import alertDialog from "../components/dialog/alertDialog";
import useScript from "./useScript";
import { GOOGLE_CLIENT_ID } from "../constants";
import { useAtomValue } from "jotai";
import UserAtom from "../components/auth/User";

type useGSIProps = {
  onSuccess: (tokenId: string) => void;
};
export default function useGSI({ onSuccess }: useGSIProps) {
  const [ready, setReady] = useState(false);

  const scriptStatus = useScript("https://accounts.google.com/gsi/client");
  const user = useAtomValue(UserAtom);

  useEffect(() => {
    if (scriptStatus === "error") {
      alertDialog({
        title: "Error Logging in",
        body: "There was an error loading the library for logging in with Google. Make sure you don't have any content blockers enabled on this site.",
      });
    }

    if (scriptStatus === "ready" && !user) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: ({ credential }) => onSuccess(credential),
        cancel_on_tap_outside: true,
      });

      setReady(true);
    }
  }, [scriptStatus, user, onSuccess]);

  return { ready };
}
