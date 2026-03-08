import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container">
      <nav id="navbar">
        <NavLink to="/" className="logo">
          Jonathan.
        </NavLink>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/works">Works</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <NavLink to="/contact" className="btn-talk">
          Let's talk
        </NavLink>
        <button
          className="menu-toggle"
          id="mobile-menu"
          onClick={() => {
            const newState = !isMenuOpen;
            setIsMenuOpen(newState);
            document.body.style.overflow = newState ? 'hidden' : 'auto';
          }}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <Outlet />

      <footer>
        <NavLink to="/" className="footer-logo">
          Jonathan.
        </NavLink>
        <ul className="footer-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/works">Works</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <p className="copyright">© {new Date().getFullYear()} Jonathan Ogunmuyiwa. All rights reserved.</p>
      </footer>
    </div>
  );
}
