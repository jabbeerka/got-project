import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../Pages/characterPage';
import BooksPage from '../Pages/booksPage';
import HousesPage from '../Pages/housesPage'


export default class App extends React.Component {
    state = {
        randomChar: true
    }
    onError = () => {
        this.setState({error:true})
    }
    onChangeRandomChar = (randomChar) => {
        this.setState({randomChar: !randomChar})
    }
    componentDidCatch() {
        this.onError()
    }
    render() {
        const {randomChar} = this.state;
        const content = randomChar ? <RandomChar /> : null
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            <Button color="dark" size="lg" className="mb-2" onClick={()=>this.onChangeRandomChar(randomChar)}>Toggle Characters</Button>
                            {content}
                        </Col>
                    </Row>
                    <Row>
                        <CharacterPage/>
                        <BooksPage/>
                        <HousesPage/>
                    </Row>
                </Container>
            </>
        )
    }
};