import React, { Component } from 'react';
import { Container } from 'react-bootstrap/';

// HOC
const LoaderHOC = (WrappedComponent) => {
    return class LoaderHOC extends Component{
        state = {
            detailPost: {}
        }

        render(){
            return(
                <>
                    <div className="overlay"></div>
                    <Container>
                        <WrappedComponent {...this.props}/>
                    </Container>
                    <div className="detail-page" id="detail-page"></div>
                </>
            );
        }
    }
}

export default LoaderHOC;
