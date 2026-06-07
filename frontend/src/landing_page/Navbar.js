import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#e8b84b" : "#94a3b8",
    fontSize: "13px",
    padding: "5px 14px",
    borderRadius: "6px",
    transition: "color 0.18s, background 0.18s",
    background: isActive ? "rgba(232,184,75,0.08)" : "transparent",
    fontWeight: isActive ? "600" : "400",
    textDecoration: "none",
});

function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#0e1a2e",
                borderBottom: "1px solid rgba(232, 184, 75, 0.18)",
                minHeight: "54px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.45)",
                padding: "0 12px",
            }}
        >
            <div className="container p-0 px-2" style={{ minHeight: "54px", alignItems: "center" }}>

                <Link className="navbar-brand" to="/">
                    <img src='/media/logo.png' alt='logo' style={{ width: "25%", mixBlendMode: "lighten" }} />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ borderColor: "rgba(232,184,75,0.4)" }}
                >
                    <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto">
                        <ul className="navbar-nav mb-lg-0" style={{ gap: "4px" }}>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/signup"
                                    style={{
                                        background: "linear-gradient(135deg, #e8b84b 0%, #c9973a 100%)",
                                        color: "#080c14",
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        padding: "5px 18px",
                                        borderRadius: "20px",
                                        letterSpacing: "0.02em",
                                        boxShadow: "0 2px 10px rgba(232,184,75,0.3)",
                                        transition: "box-shadow 0.18s ease, transform 0.18s ease",
                                    }}
                                    onMouseEnter={e => { e.target.style.boxShadow = "0 4px 18px rgba(232,184,75,0.5)"; e.target.style.transform = "translateY(-1px)"; }}
                                    onMouseLeave={e => { e.target.style.boxShadow = "0 2px 10px rgba(232,184,75,0.3)"; e.target.style.transform = "translateY(0)"; }}
                                >
                                    Signup
                                </Link>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about" style={navLinkStyle}>About</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/product" style={navLinkStyle}>Product</NavLink>
                            </li>

                            {/*<li className="nav-item">
                                <NavLink className="nav-link" to="/pricing" style={navLinkStyle}>Pricing</NavLink>
                            </li>*/}

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/support" style={navLinkStyle}>Support</NavLink>
                            </li>

                        </ul>
                    </form>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
