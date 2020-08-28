import React, {Component} from 'react';
import { ListGroup } from 'reactstrap';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';


const ListGroupItem = styled.li`
        position: relative;
        display: block;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        cursor: pointer;
        border-radius: 5px;
`



export default class ItemList extends Component {
    state = {
        itemList: null
    }
    componentDidMount() {
        const {getData} = this.props;
        getData()
        .then((itemList) => {
            this.setState({itemList})
        });
    }
    renderItems= (arr) => {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItems(item)
            return (
                <ListGroupItem className="nav-link" key={id} onClick={()=> this.props.onSelectedItem(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    } 

    render() {
        const {itemList} = this.state;
        if (!itemList) {
            return <Spinner/>
        }
        const item = this.renderItems(itemList);
        return (
            <ListGroup >
                {item}
            </ListGroup>
        );
    }
}