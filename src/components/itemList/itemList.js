import React, { useState, useEffect } from 'react';
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

const ItemList = ({ getData, renderItems, onSelectedItem }) => {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                setItemList(data)
            });
    }, []);
    const renderItem = (arr) => {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItems(item)
            return (
                <ListGroupItem className="nav-link" key={id} onClick={() => onSelectedItem(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }
    if (!itemList) {
        return <Spinner />
    }
    const item = renderItem(itemList);
    return (
        <ListGroup >
            {item}
        </ListGroup>
    );

}
export default ItemList;