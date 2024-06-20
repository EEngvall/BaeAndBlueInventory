import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,
  document.getElementById("root"),
);
