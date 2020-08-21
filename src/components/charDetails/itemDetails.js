import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import styled from 'styled-components';
import ErrorMessage from '../error/error';
import Spinner from '../spinner/spinner';


const ItemWrap = styled.div`
        background-color: rgb(68, 56, 60);
        padding-top: 20px;
        border-radius: 15px
`
const ItemTitle = styled.h4`
        margin-bottom: 20px;
        text-align: center;
        color: white;
`
const SelectItemMessage = styled.div`
        display: block;
        margin-left: 45px;
        color: white;
        font-size: 22px;
`
export const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem>
            <Badge pill>{label}</Badge> ----------
            <Badge color="success" pill>{item[field]}</Badge>
        </ListGroupItem>
    )
}

export default class ItemDetails extends Component {
    state = {
        item: null,
        error: false,
        loading: false
    }
    componentDidMount() {
        this.updateItem()
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem = () => {
        const itemId = this.props.itemId
        if (!itemId) {
            return
        }
        const {getData} = this.props
        this.setState({ loading: true })
        getData(itemId)
            .then(this.onItemDetailsLoaded)
            .catch(() => this.onError())
    }
    onError = () => {
        this.setState({
            item: null,
            error: true
        })
    }
    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    render() {
        const { item, error, loading } = this.state
        if (!item && error) {
            return <ErrorMessage />
        } else if (!item) {
            return (
                <ItemWrap>
                    <SelectItemMessage>Please, select </SelectItemMessage>
                </ItemWrap>
            )
        }
        if (loading) {
            return (
                <ItemWrap>
                    <Spinner />
                </ItemWrap>
            )
        }
        const { name } = item;
        return (
            <ItemWrap>
                <ItemTitle>{name}</ItemTitle>
                <ListGroup className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ListGroup>
            </ItemWrap>
        );
    }
}