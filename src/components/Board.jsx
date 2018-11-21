import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './List';
import { addList, getLists } from '../redux/actions';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list_title: '',
            list_position: '',
            addListFormOpened: false,
            authenticated: this.props.user.authenticated
        };

        this.props.getLists();
    }

    openAddList = () => {
        this.setState({
            addListFormOpened: !this.state.addListFormOpened
        })
    };

    _onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    _onSubmit = (event) => {
        event.preventDefault();

        if (this.state.list_title) {
            this.props.addList(this.state);
            this.setState({
                addListFormOpened: false,
                list_title: ''
            });
        }
    };

    render() {
        return (
            <div className={'board'}>
                { !this.state.authenticated && <Redirect to={{ pathname: '/login' }}/> }

                {
                    this.props.lists && this.props.lists.map(( item, index ) => {
                        return (
                            <div  key={ index } className={'board-column'}>
                                <List { ...item } />
                            </div>
                        )
                    })
                }

                <div className={'board-column board-column-add-list'}>
                    {
                        this.state.addListFormOpened
                        ?
                            <div className={'board-list p-1'}>
                                <form onSubmit={ this._onSubmit }>
                                    <div className={'mb-2'}>
                                        <input
                                            type={'text'}
                                            name={'list_title'}
                                            className={'form-control'}
                                            placeholder={'Add a list...'}
                                            onChange={ this._onChange }
                                        />
                                    </div>
                                    <div>
                                        <button className={'btn btn-sm btn-success mr-2'} type={'submit'}>Save</button>
                                        <button className={'btn btn-sm btn-light'} onClick={ this.openAddList }>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        :
                            <div><button className={'btn-add-list'} onClick={ this.openAddList }>Add a list...</button></div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lists: state.Lists,
        user: state.User
    }
};

const mapDispatchToProps = {
    addList, getLists
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);

