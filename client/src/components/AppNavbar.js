import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

class AppNavbar extends Component {

    state = {
        isOpen: false
      };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {

        const {isAuthenticated, user} = this.props.auth;
        
        const authLinks = (
            <Nav className="navbar-nav ml-auto">
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavLink href="/logout" className="nav-link" onClick={this.onLogout.bind(this)}>
                        Logout
                </NavLink>
            </Nav>
        )
      const guestLinks = (
        <Nav className="navbar-nav ml-auto">
            <NavItem className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </NavItem>
            <NavItem className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
            </NavItem>
        </Nav>
      )
        return(
            <div>
                <Navbar color='dark' dark expand='sm' className='mb-5'>
                    <Container>
                        <NavbarBrand href="/">Activity Logger</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </div>
        )
    }
}
AppNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(AppNavbar));