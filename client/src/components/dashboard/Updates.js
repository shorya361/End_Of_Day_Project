import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
class Updates extends Component {
  constructor() {
    super();
    this.state = {
      render: null,
      updates: []
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  async componentDidMount() {
    const search = this.props.auth.user.id;
    const url = '/api/users/open/' + search;
    try {
      const up = await axios.get(url);
      console.log(up);
      up.data.updates.map(dd => {
        this.state.updates.unshift(dd);
      });
    } catch (error) {
      console.log(error.message);
    }

    this.setState({
      render: (
        <div>
          <nav className='navbar bg- pink'>
            <ul>
              <Link to='/'>HOME</Link>
              <li>
                <Link to='/'>Dashboard</Link>
              </li>
              <li>
                <Link to='#' onClick={this.onLogoutClick}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )
    });
  }
  render() {
    return (
      <div>
        {this.state.render}
        <div
          className='container'
          style={{ marginTop: '90px', textAlign: 'center' }}
        >
          <div className='container'>
            <h1>Call Reports</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date </th>
                  <th>Total Calls</th>
                  <th>Calls Received</th>
                  <th>Calls not received</th>
                  <th>resposnse</th>
                </tr>
              </thead>
              <tbody>
                {this.state.updates.map(upd => (
                  <tr>
                    <td>{upd.date.slice(0, 10)}</td>
                    <td> {upd.total_Calls}</td>
                    <td>{upd.calls_received}</td>
                    <td>{upd.calls_not_received}</td>
                    <td>
                      {upd.response.map(each => (
                        <p>{each}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

Updates.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Updates));
