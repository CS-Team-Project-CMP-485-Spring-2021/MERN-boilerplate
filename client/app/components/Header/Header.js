import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Sign In</Link>

    <nav>
      <Link to="/helloworld">Sign Up</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
