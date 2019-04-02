import React, { Component } from 'react';
// import {Card, Row, Col, Spinner} from 'react-bootstrap';

class DetailPost extends Component{
    state = {
        data: {}
    };

    componentWillReceiveProps(prevProps) {
        console.log(prevProps)
        console.log(this.props)
        // Typical usage (don't forget to compare props):
        if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps)) {
            console.log('dataaaa')
        }
        console.log('noooo')
    }

    render(){
        return(
            <div>Davinnnnn {this.state.data.title}</div>
        );
    }
}

export default DetailPost;
