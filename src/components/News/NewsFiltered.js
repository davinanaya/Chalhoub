import React, { Component } from 'react';
import axios from 'axios';
import LoaderHOC from '../../HOC/LoaderHOC';
import Categories from './Categories';
import {Media, Row, Col, Spinner} from 'react-bootstrap';

class NewsFiltered extends Component{
    state = {
        category: 'general', // by default
        data: []
    };

    handleChange(event) {
        event.preventDefault(); // Let's stop this event.
        const category = event.target.getAttribute("data-category");
        this.setState({
            category
        }, () => this.getNewsFiltered());
    }

    componentDidMount(){
        return this.getNewsFiltered();
    }
    
    //Get the new filtered
    getNewsFiltered(){
        return axios.get(`https://newsapi.org/v2/sources?country=us&category=${this.state.category}`,
            { headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
        }).then(({data}) => {
            this.setState({
                data: data.sources
            });
        }).catch(error => {
            throw new Error(error);
        });
    }

    render() {
        const Postlist = this.state.data.length ? (
            this.state.data.map((post, key) => {
                return(<Media key={key}>
                    <Media.Body>
                        <h5>{post.name}</h5>
                        <p>{post.description}</p>
                        <span><b>Category:</b> {post.category}</span>
                    </Media.Body>
                </Media>)
            })
        ) : (<Spinner animation="border" variant="secondary" />);

        return (
            <div className="news-filtered">
                <Row>
                    <Col>
                        <div className="categories"><Categories handleChange={this.handleChange.bind(this)}/></div>
                    </Col>
                </Row>
                <Row>
                    <Col>{Postlist}</Col>
                </Row>
            </div>
        );
    }
}

export default LoaderHOC(NewsFiltered);