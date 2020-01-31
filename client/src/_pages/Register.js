import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { registerUser } from '../redux/actions';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirm: ''
            },
            submitted: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        if (user.name && user.email && user.password && user.password_confirm)
        {
            dispatch(registerUser(user));
        }
    }

    render() {

        const { registering  } = this.props;
        const { user, submitted } = this.state;

        return (
            <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        onChange={this.handleInputChange}
                        value={user.name}
                        />
                        {submitted && !user.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        onChange={ this.handleInputChange }
                        value={user.email}
                        />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control"
                        onChange={ this.handleInputChange }
                        value={user.passport}
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password_confirm"
                        className="form-control"
                        onChange={ this.handleInputChange }
                        value={user.passport_confirm}
                        />
                        {submitted && !user.password_confirm &&
                            <div className="help-block">Please confirm password</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                            Register
                        </button>
                        {registering && 
                            <img alt="logging in" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                <div className="container">
                    <Link className="nav-link" to="/login">
                        {"Already have an account? Sign in"}
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return { registering };
}

export default connect(
    mapStateToProps, {
        registerUser
    }
)(withRouter(Register));