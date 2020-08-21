import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error/error';


export default class App extends React.Component {
    state = {
        randomChar: true,
        selectedChar: null,
        error: false
    }
    onSelectedChar = (id) => {
        this.setState({selectedChar: id})
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
        const {randomChar, selectedChar, error} = this.state;
        const someError = !error ? <CharDetails charId={selectedChar}/> : <ErrorMessage/>
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
                        <Col md='6'>
                            <ItemList onSelectedChar={this.onSelectedChar}/>
                        </Col>
                        <Col md='6'>
                            {someError}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
};