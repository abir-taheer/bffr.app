import PowerSettingsNewOutlined from "@mui/icons-material/PowerSettingsNewOutlined";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useAtomValue } from "jotai";
import UserAtom from "../auth/User";

const styles = {
  heading: {
    padding: "0.5rem 1rem",
  },
};

const NavDrawer = ({ open, setOpen }: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const user = useAtomValue(UserAtom);

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
      <List>
        <div style={styles.heading}>
          {!!user && (
            <div>
              <p>
                You&apos;re signed in as: <b>{user.firstName}</b>
              </p>
              <p>
                Email: <b>{user.email}</b>
              </p>

              <Button
                color={"primary"}
                variant={"outlined"}
                fullWidth
                onClick={() => {
                  // user.logout();
                }}
                startIcon={<PowerSettingsNewOutlined />}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>

        <br />
      </List>
    </Drawer>
  );
};

export default NavDrawer;
