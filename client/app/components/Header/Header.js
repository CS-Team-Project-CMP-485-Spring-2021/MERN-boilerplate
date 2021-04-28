import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    

    <nav>
      <Link to="/helloworld">Sign Up</Link>
      &nbsp;
      <Link to="/">Sign In</Link>
    </nav>
     
    <hr />
  </header>
);

export default Header;
