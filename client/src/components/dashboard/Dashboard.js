import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: null,
      allUsers: {},
      currentUser: {},
      searchUser: '',
      foundUser: [],
      show: null,
      flash: ''
    };
  }
  fileSelector = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  fileUpload = () => {
    const UserID = this.props.auth.user.id;
    const image = this.state.selectedFile;
    axios
      .post('/api/users/image', { image, UserID })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ foundUser: [] });
    try {
      const search = this.state.searchUser;
      const url = '/api/users/find/' + search;
      const data = await axios.get(url);

      data.data.map(dd => {
        this.setState({
          foundUser: [...this.state.foundUser, dd]
        });
        if (!data) {
          console.log('no user found .');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    const search = this.props.auth.user.id;
    const url = '/api/users/open/' + search;
    try {
      const all = await axios.get('/api/users/find/all');

      this.setState({ allUsers: all.data });
      console.log(this.state.allUsers);
      const up = await axios.get(url);
      this.setState({ currentUser: up.data });
    } catch (error) {
      console.log(error.message);
    }

    if (this.props.auth.POST === 'Manager') {
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
            <div className='row'>
              <div style={{ width: '20%', margin: '2%' }}>
                <h3> All Employees</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee </th>
                      <th>email</th>
                      <th>Post</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allUsers.map(upd => (
                      <tr>
                        <td>
                          <Link
                            to={{
                              pathname: '/employee',
                              UserID: upd._id
                            }}
                          >
                            {upd.name}
                          </Link>
                        </td>
                        <td> {upd.email}</td>
                        <td>{upd.POST}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div style={{ width: '60%', margin: '2%' }}>
                <div className='jumbotron'>
                  <div className='row' style={{ marginLeft: '20px' }}>
                    <Card style={{ width: '18rem', height: '20rem' }}>
                      <Card.Img
                        style={{ height: '100%' }}
                        variant='top'
                        src={this.state.currentUser.image}
                      />
                    </Card>
                    <div
                      style={{
                        margin: '60px 40px',
                        height: '15rem'
                      }}
                    >
                      <ul>
                        <li>
                          <h1 style={{ textAlign: 'left' }}>
                            {this.state.currentUser.name}
                          </h1>
                        </li>
                        <br />
                        <li>
                          <h2 style={{ textAlign: 'left' }}>
                            {this.state.currentUser.POST}
                          </h2>
                        </li>
                        <br />
                        <li>
                          <h3 style={{ textAlign: 'left' }}>
                            {this.state.currentUser.email}
                          </h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <br />
                <Button href='/register'>Register new Employee</Button>
                <br />
                <br />
                <br />
                <div>
                  <form
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    style={{ textAlign: 'center' }}
                  >
                    <label style={{ fontSize: '20px' }}>
                      search by Employee name
                    </label>
                    <input
                      autoComplete='off'
                      type='text'
                      id='searchUser'
                      style={{ color: 'black' }}
                    />
                    <Button variant='success' type='submit'>
                      Search
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      });
    } else if (this.props.auth.POST === 'Tele_caller') {
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
            {this.state.flash}
            <div className='container'>
              <div className='jumbotron'>
                <div className='row' style={{ marginLeft: '20px' }}>
                  <Card style={{ width: '18rem', height: '20rem' }}>
                    <Card.Img
                      style={{ height: '100%' }}
                      variant='top'
                      src={this.state.currentUser.image}
                    />
                  </Card>
                  <div
                    style={{
                      margin: '60px 40px',
                      height: '15rem'
                    }}
                  >
                    <ul>
                      <li>
                        <h1 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.name}
                        </h1>
                      </li>
                      <br />
                      <li>
                        <h2 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.POST}
                        </h2>
                      </li>
                      <br />
                      <li>
                        <h3 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.email}
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='row' style={{ margin: '60px 100px' }}>
                <Button
                  href='/leaveForm'
                  variant='success'
                  style={{ margin: '5px 20px' }}
                >
                  Apply for leave
                </Button>
                <Button
                  href='/Leaves'
                  variant='success'
                  style={{ margin: '5px 20px' }}
                >
                  Leave Application history
                </Button>
                <Button
                  href='/fill_updates'
                  variant='success'
                  style={{ margin: '5px 20px' }}
                >
                  ADD Call Records
                </Button>
                <Button
                  variant='success'
                  href='/Updates'
                  style={{ margin: '5px 20px' }}
                >
                  VIEW Call Records
                </Button>
                <br />
                <Button
                  href='/DailyUpdatesForm'
                  variant='success'
                  style={{ margin: '5px 20px' }}
                >
                  ADD Daily Update
                </Button>
                <Button
                  variant='success'
                  href='/DailyUpdates'
                  style={{ margin: '5px 20px' }}
                >
                  VIEW Daily Updates
                </Button>
              </div>
            </div>
          </div>
        )
      });
    } else if (this.props.auth.POST === 'Executive') {
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

            {this.state.flash}
            <div className='container'>
              <div className='jumbotron'>
                <div className='row' style={{ marginLeft: '20px' }}>
                  <Card style={{ width: '18rem', height: '20rem' }}>
                    <Card.Img
                      style={{ height: '100%' }}
                      variant='top'
                      src={this.state.currentUser.image}
                    />
                  </Card>
                  <div
                    style={{
                      margin: '60px 40px',
                      height: '15rem'
                    }}
                  >
                    <ul>
                      <li>
                        <h1 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.name}
                        </h1>
                      </li>
                      <br />
                      <li>
                        <h2 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.POST}
                        </h2>
                      </li>
                      <br />
                      <li>
                        <h3 style={{ textAlign: 'left' }}>
                          {this.state.currentUser.email}
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ margin: '80px 100px' }}>
                <Button href='/leaveForm' variant='success'>
                  Apply for leave
                </Button>
                <Button href='/Leaves' variant='success'>
                  Leave Application history
                </Button>
                <Button href='/DailyUpdatesForm' variant='success'>
                  ADD Daily Update
                </Button>
                <Button variant='success' href='DailyUpdates'>
                  VIEW Daily Updates
                </Button>
              </div>
            </div>
          </div>
        )
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.render}

        <ul>
          {this.state.foundUser.map(upd => (
            <div className='container' style={{ marginTop: '20px' }}>
              <Card
                body
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  height: '15rem'
                }}
              >
                <div className='row' style={{ height: '100%' }}>
                  <img
                    src={upd.image}
                    style={{
                      height: '100%',
                      width: '20%',
                      border: '1px solid gray'
                    }}
                  />
                  <div style={{ margin: '2rem' }}>
                    <li key={upd._id}>
                      <h1> {upd.name} </h1>
                    </li>
                    <li key={upd._id}>
                      <h3>{upd.POST} </h3>
                    </li>
                  </div>
                  <Button
                    style={{
                      marginTop: '3rem',
                      marginLeft: '27rem',
                      variant: 'green'
                    }}
                  >
                    <Link
                      to={{
                        pathname: '/employee',
                        UserID: upd._id
                      }}
                      style={{ color: 'white' }}
                    >
                      Open Profile
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logoutUser })(Dashboard);
