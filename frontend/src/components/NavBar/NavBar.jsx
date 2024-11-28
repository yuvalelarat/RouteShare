import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NavBarMenu from "./NavBarMenu";
import NavBarLogo from "./NavBarLogo";
import { pages, desktopTypography, mobileTypography } from "./constants";

function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "lightblue", color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop View */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={desktopTypography}
          >
            TRIPSYNC
          </Typography>
          {/* Mobile Menu */}
          <NavBarMenu pages={pages} />
          <NavBarLogo />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={mobileTypography}
          >
            TRIPSYNC
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
