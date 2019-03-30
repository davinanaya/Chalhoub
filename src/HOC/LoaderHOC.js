import React, { Component } from 'react';
import { Container } from 'react-bootstrap/';

// HOC
const LoaderHOC = (WrappedComponent) => {
    return class LoaderHOC extends Component{
        render(){
            return(
                <Container>
                    <WrappedComponent {...this.props}/>
                </Container>
            );
        }
    }
}

export default LoaderHOC;
