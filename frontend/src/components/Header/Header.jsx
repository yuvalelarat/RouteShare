import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
  };
  return (
    <>
      <div>
        <div>
          <p>RIGHT</p>
        </div>
        <div>
        <p>MIDDLE</p>
          </div>
          <div>
          <p>RIGHT</p>
          </div>
      </div>
    </>
  );
}

export default Header;
