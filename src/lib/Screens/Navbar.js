/// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../lib/Images/logo.png";

export default function Navbar() {
  console.log("🔄 Render Navbar");

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Seleccion</Link>
        <Link to="/MainEntrenamiento" style={styles.link}>Entrenamiento</Link>
        <Link to="/MainSimulacion" style={styles.link}>Simulacion</Link>
        <Link to="/templates" style={styles.link}>Templates</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px 40px",
    borderBottom: "1px solid #eee",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
  textContainer: {
    lineHeight: "1",
  },
  title: {
    margin: 0,
    color: "#3b873e",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    color: "#3b873e",
    fontSize: "13px",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#555",
    fontWeight: "500",
  },
};
