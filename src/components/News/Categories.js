import React, { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import Nav from 'react-bootstrap/Nav';

class Categories extends Component {
    state = {
        categories: [],
    }

    componentDidMount(){
        return axios.get('https://newsapi.org/v2/sources?country=us',
            { headers: {'X-Api-Key': process.env.REACT_APP_API_KEY}
        }).then(({data}) => {
            const categories = _.unionBy(data.sources, 'category')
            this.setState({
                categories
            });
        }).catch(error => {
            throw new Error(error);
        });
    }

    render() {
        const categories = this.state.categories.map((category, key) => {
            return(
                <Nav.Item key={key} >
                    <Nav.Link href={"#"+category.category} data-category={category.category} onClick={this.props.handleChange} >{category.category}</Nav.Link>
                </Nav.Item>
                )
            }
        )
        return(
            <Nav variant="pills" defaultActiveKey="#general">
                {categories}
            </Nav>
        );
    }
}

export default Categories;
