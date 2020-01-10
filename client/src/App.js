import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Container } from 'reactstrap';

import store from './redux/store';
import setAuthToken from './redux/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/userActions';

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
        window.location.href = '/'
    }
}

class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='App'>
                        <AppNavbar />
                        <ActivityModal />
                        <Route exact path="/" component={Home} />
                        <Container>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                        </Container>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;