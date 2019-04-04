import React, { Component } from 'react';
import { TimelineLite, TweenMax } from "gsap/all";
import {Row, Col, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DetailPost extends Component{
    state = { };

    timeline = new TimelineLite();

    componentDidMount() {
        this.onOpen();
        document.querySelectorAll('.overlay, .fa-times').forEach((element) => {
            element.addEventListener('click', function () {
                const myTween = new TimelineLite()
                myTween
                    .to(document.querySelector('.detail-page'), 0.4, {display:'none', autoAlpha: 0, right: '-100%'})
                    .to(document.querySelector('.overlay'), 0.4, {autoAlpha: 0, display: 'none'})
                document.querySelector('.container').classList.remove('open');
                document.querySelector('body').style.overflow = 'auto';
            })
        })
    }
    
    componentDidUpdate() {
        this.onOpen();
    }
    
    onOpen(){
        const detail = document.querySelector('.detail-page');
        this.timeline
            .to(detail, 0.4, {display:'block', autoAlpha: 1, right: '0%'});
        TweenMax.staggerFrom(detail.querySelectorAll('img, h2, p'), 0.7, { x: 70, opacity: 0 }, 0.09);
        TweenMax.staggerFrom(detail.getElementsByTagName('svg'), 0.9, { y: 20, opacity: 0 }, 0.09);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <FontAwesomeIcon icon='times' className='icon-close'/>
                        <img src={this.props.urlToImage} alt={this.props.title} width="100%"/>
                        <h2>{this.props.title}</h2>
                        <p>{this.props.content}</p>

                        <div className="social">
                            <FontAwesomeIcon icon={['fab', 'facebook-square']} size='2x' color="#3b579d"/>
                            <FontAwesomeIcon icon={['fab', 'twitter-square']} size='2x' color="#39a0ce"/>
                            <FontAwesomeIcon icon={['fab', 'youtube-square']} size='2x' color="#e02926"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DetailPost;
