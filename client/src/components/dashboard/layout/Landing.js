import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }} className='container'>
        <br />
        <h1>Second Minor Project</h1>
        <h2>End Of Day </h2>
        <br />
        <div className='col s6'>
          <Button href='/register' variant='danger'>
            Register
          </Button>
        </div>
        <br />
        <div className='col s6 '>
          <Button href='/login' variant='danger'>
            Log In
          </Button>
        </div>
      </div>
    );
  }
}

export default Landing;
