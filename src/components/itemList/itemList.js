import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import APIrequest from '../API/Api';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {
    APIrequest = new APIrequest();
    state = {
        char: null
    }
    componentDidMount() {
        this.APIrequest.getAllCharacters()
        .then((char) => {
            this.setState({char})
        });
    }
    renderItems= (arr) => {
        return arr.map((item) => {
            const {id, name} = item
            return (
                <ListGroupItem key={id} onClick={()=> this.props.onSelectedChar(id)}>
                    {name}
                </ListGroupItem>
            )
        })
    } 

    render() {
        const {char} = this.state;
        if (!char) {
            return <Spinner/>
        }
        const item = this.renderItems(char);
        return (
            <ListGroup >
                {item}
            </ListGroup>
        );
    }
}