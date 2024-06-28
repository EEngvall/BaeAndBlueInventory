// src/components/common/Navbar.js

import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useUser } from "../../Context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";

const MyNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const { userInfo } = useUser();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setExpanded(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Bae and Blue
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>

            {user && (
              <Nav.Link
                as={Link}
                to="/inventory"
                onClick={() => setExpanded(false)}
              >
                Inventory List
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Signed in as: <strong>{userInfo?.firstName}</strong>
                </Navbar.Text>
                <Button variant="outline-danger" onClick={handleSignOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to="/auth" onClick={() => setExpanded(false)}>
                Login
              </Button>
            )}
          </Nav>
          <Button
            onClick={toggleTheme}
            variant={darkMode ? "dark" : "light"}
            className="ms-2"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
