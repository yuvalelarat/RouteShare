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
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "lightblue", color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu */}
          <NavBarMenu pages={pages} handleNavigation={handleNavigation} />
          <NavBarLogo />
          {/* Desktop Title */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={desktopTypographyStyle}
          >
            TRIPSYNC
          </Typography>
          {/* Mobile Title */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={mobileTypographyStyle}
          >
            TRIPSYNC
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
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
