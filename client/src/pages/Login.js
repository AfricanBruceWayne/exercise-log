import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../redux/actions'

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props
        if (email && password)
        {
            dispatch(loginUser(email, password));
        }
    }

    render() {

        const { email, password, submitted } = this.state;

        return (
            <div className="container col-md-6 col-md-offset-3" style={{ marginTop: '50px', width: '700px'}}>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        onChange={ this.handleInputChange }
                        value={email}
                        />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control"
                        onChange={ this.handleInputChange }
                        value={password}
                        />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">
                            Log in
                        </button>    
                    </div>
                </form>
                <div className="container">
                    <Link className="nav-link" to="/register">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { isAuthenticated } = state.auth;
    return {
        isAuthenticated
    };
}

export default connect(mapStateToProps)(withRouter(Login));