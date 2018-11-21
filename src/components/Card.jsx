import * as React from 'react';
import { connect } from 'react-redux';
import { delCard, editCard } from "../redux/actions";

class Card extends React.Component {
    constructor(props) {
        super(props);

        const { ...item } = props;

        this.state = {
            editCardFormOpened: false,
            card_title: this.props.card_title,
            card_id: this.props._id,
            list_id: this.props.list_id,
            card_position: this.props.card_position,
            tools: false
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            card_title: nextProps.card_title,
            card_id: nextProps._id,
            list_id: nextProps.list_id,
            card_position: nextProps.card_position,
        });
    };

    componentDidUpdate = (prevState) => {
        if (!this.state.editCardFormOpened && (this.state.card_title === '' || this.state.card_title !== prevState.card_title)) {
            this.setState({
                card_title: prevState.card_title
            })
        }
    };

    showTools = () => {
        this.setState({
            tools: true
        })
    };

    hideTools = () => {
        this.setState({
            tools: false
        })
    };

    openEditCard = () => {
        this.setState({
            editCardFormOpened: !this.state.editCardFormOpened,
            tools: false
        })
    };

    deleteCard = () => {
        this.props.delCard(this.state)
    };

    _onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    _onSubmit = (event) => {
        event.preventDefault();

        console.log(111, this.state);

        if (this.state.card_title) {
            this.props.editCard(this.state);

            this.setState({
                editCardFormOpened: false,
                card_title: ''
            });
        }
    };


    render() {
        return (
            <div className={'board-card'} onMouseEnter={ this.showTools } onMouseLeave={ this.hideTools }>
                {
                    this.state.editCardFormOpened
                    ?
                        <div className={'clearfix'}>
                            <form onSubmit={ this._onSubmit }>
                                <div className={'mb-2'}>
                                            <textarea
                                                rows={'3'}
                                                name={'card_title'}
                                                className={'form-control'}
                                                onChange={ this._onChange }
                                                value={ this.state.card_title }
                                            />
                                </div>
                                <button className={'btn btn-sm btn-success float-left mr-2'} type={'submit'}>Add</button>
                                <button className={'btn btn-sm btn-light'} onClick={ this.openEditCard }>Cancel</button>
                            </form>
                        </div>
                    :
                        <div>
                            {
                                this.state.tools
                                &&
                                <div className={'board-icons'}>
                                    <span onClick={ this.openEditCard }><i className={'material-icons'}>edit</i></span>
                                    <span onClick={ this.deleteCard }><i className={'material-icons'}>delete_forever</i></span>
                                </div>

                            }

                            { this.state.card_title }
                        </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = {
    delCard, editCard
};

export default connect(null, mapDispatchToProps)(Card);

