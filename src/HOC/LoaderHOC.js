import React, { Component } from 'react';
import { Container } from 'react-bootstrap/';
import DetailPost from '../components/News/DetailPost';
import { TimelineLite } from "gsap/all";

// HOC
const LoaderHOC = (WrappedComponent) => {
    return class LoaderHOC extends Component{        
        // reference to the animation
        myTween = new TimelineLite();
        state = {
            detailPost: {}
        }

        detailPost(index) {
            // DetailPost.prototype.props = this.state.topHeadlines[index];
            this.setState({
                detailPost: 
            })
            const overlay = document.querySelector('.overlay');
            this.myTween.to(overlay, 0.4, {autoAlpha: 1, display: 'block'})
            document.querySelector('.container').classList.add('open');
        }

        render(){
            return(
                <div>
                    <div className="overlay"></div>
                    <Container>
                        <WrappedComponent {...this.props}/>
                    </Container>
                    <div className="detail-page">
                        <DetailPost {...this.state.detailPost} />
                    </div>
                </div>
            );
        }
    }
}

export default LoaderHOC;
