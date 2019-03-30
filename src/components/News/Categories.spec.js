import React from 'react';
import Categories from './Categories';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {sources: [{category:'sport'}]}
        }))
    }
});

// eslint-disable-next-line import/first
import axios from 'axios';

describe('Given a Categories', ()=> {
    describe('When axios its called', () => {
        it('It should get the data', ()=> {
            const categories = mount(<Categories />);
            categories.instance().componentDidMount().then(() => {
                expect(axios.get).toHaveBeenCalled();
                expect(categories.state()).toHaveProperty('categories', [
                    { category:'sport' }
                ]);
            });
        })
    });

    describe('When component render i called', ()=> {
        let categories;
        let handleChange;
        beforeEach( async () => {
            categories = mount(<Categories/>);
            await categories.setProps({ handleChange:  jest.fn()});
            await categories.setState({ categories: [{category: 'sport'}, {category: 'general'}]});

            handleChange = jest.spyOn(categories.props(), "handleChange");
        });

        it('It should check the component data', () => {
            expect(categories.exists()).toBe(true);
            expect(categories.state('categories')).toEqual([{category: 'sport'}, {category: 'general'}]);
        });

        it('It should check the length of the categories and get the of the first item', () => {
            expect(categories.find('NavItem')).toHaveLength(2);
            expect(categories.find('NavItem').get(0).props.children.props.children).toEqual('sport');
        });

        it('It should simulate onlCick', () => {
            categories.find('NavLink').at(1).simulate('click');
            expect(handleChange).toBeCalled();
        });
    });
})

