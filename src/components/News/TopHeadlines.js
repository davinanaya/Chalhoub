import React, { Component } from 'react';
import axios from 'axios';
import {Card, Row, Col, Spinner} from 'react-bootstrap';
import LoaderHOC from '../../HOC/LoaderHOC';
import { TimelineLite } from "gsap/all";
// import DetailPost from './DetailPost';

class TopHeadlines extends Component{
    state = {
        topHeadlines: []
    };
    // reference to the animation
    myTween = new TimelineLite();

    componentDidMount(){
        return axios.get('https://newsapi.org/v2/top-headlines?country=us',
            { headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
        }).then(({data}) => {
            this.setState({
                topHeadlines: data.articles
            }, () => {
                this.lazyImages()
            });
        }).catch(error => {
            throw new Error(error);
        });
    }

    lazyImages(){
        // Progressive loading images
        const imagesToLoad = document.querySelectorAll('img[data-src]');
        const loadImages = function(image) {
            image.setAttribute('src', image.getAttribute('data-src'));
            image.onload = function() {
                image.removeAttribute('data-src');
            };
        };

        if('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(items, observer) {
                items.forEach(function(item) {
                    if(item.isIntersecting) {
                        loadImages(item.target);
                        observer.unobserve(item.target);
                    }
                });
            });
            imagesToLoad.forEach(function(img) {
                observer.observe(img);
            });
        } else {
            imagesToLoad.forEach(function(img) {
                loadImages(img);
            });
        }
    }

    render() {
        const Postlist = this.state.topHeadlines.length ? (
            this.state.topHeadlines.map((post, key) => {
                const trimDescription = post.description.substring(0, 110);
                const trimTitle = post.title.substring(0, 44);
                return(
                <Col key={key}>
                    <Card style={{ width: '18rem' }}>
                        <div className="wrap-img" onClick={() => this.detailPost(key)}><Card.Img variant="top" src="./blur.jpg" data-src={post.urlToImage}/></div>
                        <Card.Body>
                            <Card.Title>{trimTitle}...</Card.Title>
                            <Card.Text>{trimDescription}...</Card.Text>
                            <div className="actions">
                                <div className="view-detail" onClick={this.props.detailPost}>View detail</div>
                                <div className="like"></div>
                            </div>
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

TopHeadlines.prototype.detailPost = (index) => {
    // DetailPost.prototype.props = this.state.topHeadlines[index];
    console.log(this.props.topHeadlines[index])
    const overlay = document.querySelector('.overlay');
    this.myTween.to(overlay, 0.4, {autoAlpha: 1, display: 'block'})
    document.querySelector('.container').classList.add('open');
}

export default LoaderHOC(TopHeadlines);