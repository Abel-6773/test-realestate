import "./NavBar.css";
import { NavLink } from "react-router-dom";
import OfferIcon from "../assets/svg/localOfferIcon.svg?react";
import ExploreIcon from "../assets/svg/exploreIcon.svg?react";
import PersonOutlineIcon from "../assets/svg/personOutlineIcon.svg?react";

export default function NavBar() {
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <NavLink to="offers">
            <li>
              <OfferIcon />
              <p className="navbarListItemName">Offer</p>
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <ExploreIcon />
              <p className="navbarListItemName">Explore</p>
            </li>
          </NavLink>
          <NavLink to="profile">
            <li>
              <PersonOutlineIcon />
              <p className="navbarListItemName">Profile</p>
            </li>
          </NavLink>
        </ul>
      </nav>
    </footer>
  );
}
