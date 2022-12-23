import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";

export default function Header() {
  return (
    <header className="header">
       <Link to="/" className="header__anchor" title="to Homepage">
          My CookBook
        </Link>
      <GoogleAuth />
      <div className="border"></div>
    </header>
  );
}
