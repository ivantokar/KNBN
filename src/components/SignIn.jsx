import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../redux/actions';
import { validateInput } from '../validation';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            email: '',
            password: '',
            message: '',
            authenticated: this.props.user.authenticated
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.user.success) {
            this.setState({
                message: nextProps.user.message,
            });
        }

        this.setState({
            authenticated: nextProps.user.authenticated
        });
    };

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({
                errors,
                alert: false,
            })
        }

        return isValid;
    }

    _onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    _onSubmit = (event) => {
        event.preventDefault();

        if (this.isValid()) {
            this.props.loginUser(this.state);

            this.setState({
                errors: {},
            })
        }
    };

    render() {
        return (
            <div className="board board-light-green">
                <div className={'d-flex w-100 align-items-center'}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 mx-auto">
                                <h2 className={'text-center text-dark'}>Sign In</h2>

                                { this.state.authenticated && <Redirect to={{ pathname: '/' }}/> }

                                {
                                    this.state.message
                                        &&
                                        <div className="alert alert-danger">
                                            { this.state.message }
                                        </div>
                                }

                                <form onSubmit={ this._onSubmit }>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            name={'email'}
                                            className="form-control form-control-lg"
                                            placeholder="Enter email"
                                            onChange={ this._onChange }
                                        />
                                        { this.state.errors.email && <div className="invalid-feedback d-block">{ this.state.errors.email }</div> }
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name={'password'}
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            onChange={ this._onChange }
                                        />
                                        { this.state.errors.password && <div className="invalid-feedback d-block">{ this.state.errors.password }</div> }
                                    </div>
                                    <div className={'text-center'}>
                                        <button type="submit" className="btn btn-dark btn-lg px-5">Login</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.User
    }
};

const mapDispatchToProps = {
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
