import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import React, { useContext, useState } from "react";
import { useAtomValue } from "jotai";
import UserAtom from "../auth/User";

const styles = {
  button: {
    color: "black",
    margin: "0 0.5rem",
  },
  popover: {
    padding: "1rem",
  },
};

const UserMenuItem = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const user = useAtomValue(UserAtom);

  return (
    <>
      <Button
        disableRipple
        onClick={(ev) => {
          setAnchorEl(anchorEl ? null : ev.target as HTMLButtonElement);

        }}
        endIcon={<ArrowDropDown />}
        sx={styles.button}
      >
        Hi {user?.firstName}
      </Button>

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onBackdropClick={() => {
          setAnchorEl(null);
        }}
      >
        <div style={styles.popover}>
          <p>
            You&apos;re signed in as: <b>{user?.firstName}</b>
          </p>
          <p>
            Email: <b>{user?.email}</b>
          </p>

          <Button
            fullWidth
            variant={"outlined"}
            color={"primary"}
            // onClick={user.logout}
          >
            Sign Out
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default UserMenuItem;
