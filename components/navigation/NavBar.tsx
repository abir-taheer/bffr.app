import { Menu as MenuIcon } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import NavBarButton from "./NavBarButton";
import NavDrawer from "./NavDrawer";

const styles = {
  appBar: {
    display: "flex",
    maxWidth: 1200,
    margin: "auto",
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    // Only show if screen is larger than 850px
    "@media (max-width: 850px)": {
      display: "none",
    },
  },
  menuIcon: {
    // Only show the menu button if screen is smaller than 851px
    "@media (min-width: 851px)": {
      display: "none",
    },
  },
};

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <NavDrawer open={drawerOpen} setOpen={setDrawerOpen} />

      <AppBar
        position="relative"
        sx={styles.appBar}
        elevation={0}
        color={"transparent"}
      >
        <Toolbar>
          <Link href={"/"} passHref>
            <Typography variant="h6" sx={styles.title}>
              BFFR
            </Typography>
          </Link>

          <Stack spacing={2} direction={"row"} sx={styles.tabs}>
            <NavBarButton href={"/"} label={"Home"} active={path === "/"} />

            <NavBarButton
              href={"/faq"}
              active={path.startsWith("/faq")}
              label={"FAQs"}
            />
          </Stack>
          <IconButton
            sx={styles.menuIcon}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
