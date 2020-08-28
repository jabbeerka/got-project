import React, { useState, useEffect } from 'react';
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

const ItemDetails = ({ getData, itemId, children }) => {
    const [item, setItem] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=> {
        updateItem();
    }, [itemId]);
    const updateItem = () => {
        if (!itemId) {
            return
        }
        setLoading(true);
        getData(itemId)
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch(() => {
                setItem({});
                setError(true);
            })
    }

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
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item })
                    })
                }
            </ListGroup>
        </ItemWrap>
    );

}
export default ItemDetails;
