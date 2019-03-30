import React, { Component } from 'react';
import axios from 'axios';
import {Card, Row, Col, Spinner} from 'react-bootstrap';
import LoaderHOC from '../../HOC/LoaderHOC';

class TopHeadlines extends Component{
    state = {
        topHeadlines: []
    };

    componentDidMount(){
        return axios.get('https://newsapi.org/v2/top-headlines?country=us',
            { headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
        }).then(({data}) => {
            this.setState({
                topHeadlines: data.articles
            });
        }).catch(error => {
            throw new Error(error);
        });
    }

    render() {
        const Postlist = this.state.topHeadlines.length ? (
            this.state.topHeadlines.map((post, key) => {
                return(
                <Col key={key}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={post.urlToImage} />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>{post.description}</Card.Text>
                            <Card.Link href={post.url}>Visit page</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>)
            })
        ) : (<Spinner animation="border" variant="secondary" />);

        return (
            <div>
                <h1>Top headlines</h1>
                <Row>
                    {Postlist}
                </Row>
            </div>
        );
    }
}

export default LoaderHOC(TopHeadlines);