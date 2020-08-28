import React, {useState, useEffect} from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import APIrequest from '../../API/Api';
import RowBlock from '../../rowBlock/rowBlock';



const BooksPage = () => {
    const [bookId, setBookId] = useState(7);
    const onSelectedBook = (id) => {
        setBookId(id);
    }
    useEffect(()=> onSelectedBook(),[]);
    const {getAllBooks, getBook} = new APIrequest()
    const itemList = (
        <ItemList
            onSelectedItem={onSelectedBook}
            getData={getAllBooks}
            renderItems={({ name, publisher }) => `${name} (${publisher})`} />
    );
    const charDetails = (
        <ItemDetails itemId={bookId} getData={getBook}>
            <Field label="Authors" field="author" />
            <Field label="Publisher" field="publisher" />
            <Field label="Pages count" field="numberOfPages" />
            <Field label="Released" field="released" />
        </ItemDetails>);
    return (
        <RowBlock left={itemList} right={charDetails} />
    )
}

export default BooksPage;