import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';


import { history, store, setAuthToken } from './helpers';
import { alertActions, logoutUser, setCurrentUser } from './redux/actions';

import AppNavbar from './components/AppNavbar';
import ActivityModal from './components/ActivityModal';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

if (localStorage.jwtToken)
{
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime)
    {
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
}

class App extends Component {
    
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {

        const { alert } = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className='App'>
                        <AppNavbar />
                        <div className="container mx-auto mb-3">
                            <div className="col-sm-8 col-sm-offset-2">
                                {
                                    alert.message && <div className={`alert ${alert.type}`}>
                                        {alert.message}
                                    </div>
                                }
                            </div>
                        </div>
                        <ActivityModal />
                        <Route exact path="/" component={Home} />
                        <Container>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                        </Container>
                    </div>
                </Router>
            </Provider>
        );
    }
}

function mapStateToProps(state) {
    const alert = state;
    return { alert }
}

export default connect(mapStateToProps)(App); 