import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Card, Row, Col, Spinner} from 'react-bootstrap';
import LoaderHOC from '../../HOC/LoaderHOC';
import { TimelineLite, TweenMax } from 'gsap/all';
import DetailPost from './DetailPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CSSPlugin from 'gsap/CSSPlugin';
const C = CSSPlugin;
class TopHeadlines extends Component{
    constructor(props){
        super(props);
        this.state = {
            topHeadlines: [],
            checked: true
        };
        // reference to the animation
        this.timeline = new TimelineLite();
    }

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
            // throw new Error(error);
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

    detailPost(index){
        const data = this.state.topHeadlines[index]
        ReactDOM.render(<DetailPost {...data}/>, document.getElementById('detail-page'))

        const overlay = document.querySelector('.overlay');
        this.timeline.to(overlay, 0.4, {autoAlpha: 1, display: 'block'})
        document.querySelector('.container').classList.add('open');
        document.querySelector('body').style.overflow = 'hidden';
    }

    handleElement(element){
        if(element){
            element.addEventListener('mouseout', function(){
                const svg = this.getElementsByTagName('svg');
                TweenMax.staggerTo(svg, 0.4, { y: 20, opacity: 0 }, 0.05);
            });
            
            element.addEventListener('mouseover', function(){
                const svg = this.getElementsByTagName('svg');
                TweenMax.staggerTo(svg, 0.4, { y: 0, opacity: 1 }, 0.05);
            });
        }
    }

    render() {
        const Postlist = this.state.topHeadlines.length ? (
            this.state.topHeadlines.map((post, key) => {

                let dataPost;
                try {
                    const trimDescription = post.description.substring(0, 106);
                    const trimTitle = post.title.substring(0, 43);
                    dataPost = <Col key={key}>
                        <Card  style={{ width: '18rem' }} ref={(ref) => this.handleElement(ref)}>
                            <div className="wrap-img" onClick={() => this.detailPost(key)}><Card.Img variant="top" src="./blur.jpg" data-src={post.urlToImage}/></div>
                            <Card.Body>
                                <Card.Title>{trimTitle}...</Card.Title>
                                <Card.Text>{trimDescription}...</Card.Text>
                                <div className="actions">
                                    <FontAwesomeIcon icon='info' onClick={() => this.detailPost(key)}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>;
                } catch(error){
                    // eslint-disable-next-line no-console
                    console.log('API return wrong data key:' + key);
                }

                return dataPost;
            })
        ) : (<Spinner animation='border' variant='secondary' />);
        
        return (
            <div className='top-headlines'>
                <h1>Top headlines</h1>
                <Row>
                    {Postlist}
                </Row>
            </div>
        );
    }
}

export default LoaderHOC(TopHeadlines);
