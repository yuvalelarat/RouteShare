import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NavBarMenu from "./NavBarMenu";
import NavBarLogo from "./NavBarLogo";
import { pages } from "./constants";
import { desktopTypographyStyle, mobileTypographyStyle } from "./styles.js";
import { Link } from "react-router-dom";

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
            sx={desktopTypographyStyle}
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
            sx={mobileTypographyStyle}
          >
            TRIPSYNC
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link} // This is where you use `Link` on the buttons
                to={`/${page.toLowerCase().replace(" ", "-")}`} // Map pages to routes
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
