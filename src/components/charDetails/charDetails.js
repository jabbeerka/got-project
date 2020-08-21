import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import styled from 'styled-components';
import APIrequest from '../API/Api';
import ErrorMessage from '../error/error';
import Spinner from '../spinner/spinner';


const CharWrap = styled.div`
        background-color: rgb(68, 56, 60);
        padding-top: 20px;
        border-radius: 15px
`
const CharTitle = styled.h4`
        margin-bottom: 20px;
        text-align: center;
        color: white;
`
const SelectCharMessage = styled.div`
        display: block;
        margin-left: 45px;
        color: white;
        font-size: 22px;
`
export default class CharDetails extends Component {
    APIrequest = new APIrequest();
    state = {
        char: null,
        error: false,
        loading: false
    }
    componentDidMount() {
        this.updateChar()
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    updateChar = () => {
        const charId = this.props.charId
        if (!charId) {
            return
        }
        this.setState({loading: true})
        this.APIrequest.getCharacter(charId)
            .then(this.onCharDetailsLoaded)
            .catch(() => this.onError())
    }
    onError = () => {
        this.setState({
            char: null,
            error: true
        })
    }
    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    render() {
        const { char, error, loading } = this.state
        if (!char && error) {
            return <ErrorMessage />
        } else if (!char) {
            return (
                <CharWrap>
                    <SelectCharMessage>Please, select a Character</SelectCharMessage>
                </CharWrap>
            )
        }
        if (loading) {
            return (
                <CharWrap>
                    <Spinner />
                </CharWrap>
            )
        }
        const { name, gender, born, died, culture } = char;
        return (
            <CharWrap>
                <CharTitle>{name}</CharTitle>
                <ListGroup className="list-group list-group-flush">
                    <ListGroupItem>
                        <Badge pill>Gender</Badge> ----------
                    <Badge color="success" pill>{gender}</Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Badge pill>Born</Badge> ----------
                    <Badge color="success" pill>{born}</Badge>
                    </ListGroupItem>
                    <ListGroupItem >
                        <Badge pill>Died</Badge> ----------
                    <Badge color="success" pill>{died}</Badge>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Badge pill>Culture</Badge> ----------
                    <Badge color="success" pill>{culture}</Badge>
                    </ListGroupItem>
                </ListGroup>
            </CharWrap>
        );
    }
}