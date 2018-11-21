import React from 'react';
import { Router, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Board from './components/Board';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { logoutUser } from './redux/actions';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: this.props.user.authenticated
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            authenticated: nextProps.user.authenticated
        });
    };

    logout = () => {
        this.props.logoutUser(this.state);
        this.props.history.push('/');
    };

    render() {
        return (
            <Router history={ history }>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        {
                            this.state.authenticated
                            ?
                                <ul className="navbar-nav text-center">
                                    <li className="nav-item">
                                        <NavLink to={'/'} className="nav-link" onClick={ this.logout }>Logout</NavLink>
                                    </li>
                                </ul>

                            :
                                <ul className="navbar-nav text-center">
                                    <li className="nav-item">
                                        <NavLink to={'/login'} className="nav-link">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/signup'} className="nav-link">Sign Up</NavLink>
                                    </li>
                                </ul>
                        }

                    </nav>

                    <Switch>
                        <Route exact path="/" component={ Board } />
                        <Route path="/login" component={ SignIn } />
                        <Route path="/signup" component={ SignUp } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.User
    }
};

const mapDispatchToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

