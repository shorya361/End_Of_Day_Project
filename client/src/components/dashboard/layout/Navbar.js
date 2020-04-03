import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar bg- pink'>
        <ul>
          <Link to='/'>HOME</Link>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
