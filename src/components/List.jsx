import * as React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { addCard, getCards, renameList, delList } from '../redux/actions';

class List extends React.Component {
    constructor(props) {
        super(props);
        const { ...item } = props;

        this.state = {
            tools: true,
            card_title: '',
            cards: this.props.cards,
            list_title: this.props.list_title,
            list_id: this.props._id,
            list_position: this.props.list_position,
            addCardFormOpened: false,
            renameListFormOpened: false

        };

        this.props.getCards();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            cards: nextProps.cards,
            list_title: nextProps.list_title,
            list_id: nextProps._id,
            list_position: nextProps.list_position
        });
    };

    openAddCard = () => {
        this.setState({
            addCardFormOpened: !this.state.addCardFormOpened
        })
    };

    openRenameListTitle = () => {
        this.setState({
            renameListFormOpened: !this.state.renameListFormOpened,
            tools: false
        })
    };

    renameListTitle = () => {
        this.setState({
            renameListFormOpened: !this.state.renameListFormOpened,
            tools: true
        });

        this.props.renameList(this.state);
    };

    deleteList = () => {
        this.props.delList(this.state)
    };

    _onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.renameListTitle();
        }
    };

    _onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    _onSubmit = (event) => {
        event.preventDefault();

        if (this.state.card_title) {
            this.props.addCard(this.state);

            this.setState({
                addCardFormOpened: false,
                card_title: ''
            });
        }
    };

    render() {

        return (
            <div className={'board-list'}>
                <div className={'board-list-title'}>

                    {
                        this.state.tools
                        &&
                        <div className={'board-icons'}>
                            <span onClick={ this.deleteList }><i className="material-icons">delete_forever</i></span>
                        </div>
                    }

                    {
                        this.state.renameListFormOpened
                        ?
                            <div>
                                <input
                                    name={'list_title'}
                                    type={'text'}
                                    className={'form-control'}
                                    value={ this.state.list_title }
                                    onBlur={ this.renameListTitle }
                                    onKeyPress={ this._onKeyPress }
                                    onChange={ this._onChange }
                                />
                            </div>
                        :
                            <div onClick={ this.openRenameListTitle }>{ this.state.list_title }</div>
                    }
                </div>
                <div className={'board-list-cards'}>
                    {
                        this.state.cards && this.state.cards.map(( item, index ) => {
                            return (
                                item.list_id === this.state.list_id && <Card key={ index } { ...item } />
                            )
                        })
                    }

                </div>
                <div className={'board-list-footer'}>
                    {
                        this.state.addCardFormOpened
                        ?
                            <div className={'clearfix'}>
                                <form onSubmit={ this._onSubmit }>
                                    <div className={'mb-2'}>
                                        <textarea
                                            rows={'2'}
                                            name={'card_title'}
                                            className={'form-control'}
                                            onChange={ this._onChange }
                                        />
                                    </div>
                                    <button className={'btn btn-sm btn-success float-left mr-2'} type={'submit'}>Add</button>
                                    <button className={'btn btn-sm btn-light'} onClick={ this.openAddCard }>Cancel</button>
                                </form>
                            </div>
                        :
                            <button type={'button'} className={'btn-add-card'} onClick={ this.openAddCard }>
                                Add a card...
                            </button>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cards: state.Cards
    }
};

const mapDispatchToProps = {
    addCard, getCards, renameList, delList
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
