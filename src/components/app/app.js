import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../Pages/characterPage';
import BooksPage from '../Pages/booksPage';
import HousesPage from '../Pages/housesPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import HouseDetails from '../Pages/housesPage/houseDetails';



export default class App extends React.Component {
    state = {
        randomChar: true
    }
    onError = () => {
        this.setState({ error: true })
    }
    onChangeRandomChar = (randomChar) => {
        this.setState({ randomChar: !randomChar })
    }
    componentDidCatch() {
        this.onError()
    }
    render() {
        const { randomChar } = this.state;
        const content = randomChar ? <RandomChar /> : null
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                <Button color="dark" size="lg" className="mb-2" onClick={() => this.onChangeRandomChar(randomChar)}>Toggle Characters</Button>
                                {content}
                            </Col>
                        </Row>
                        <Row>
                            <Route path="/characters" component={CharacterPage} />
                            <Route path="/houses" exact component={HousesPage} />
                            <Route path="/books" exact component={BooksPage} />
                            <Route path="/houses/:id" render={({match})=> {
                                return <HouseDetails itemId={match.params.id} />
                            }}/>
                        </Row>
                    </Container>
                </div>
            </Router>
        )
    }
};