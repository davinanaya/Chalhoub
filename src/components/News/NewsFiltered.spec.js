import React from 'react';
import NewsFiltered from './NewsFiltered';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: { sources: [
                { category: 'test', description: 'description2', name: 'name2' },
                { category: 'test', description: 'description3', name: 'name3' }
            ]}
        }))
    }
});

// eslint-disable-next-line import/first
import axios from 'axios';

describe('Given a NewsFiltered', ()=> {
    describe('When axios its called', () => {
        let newsFiltered;
        beforeEach( async () => {
            // we look inside our HOC to get the component
            newsFiltered =  shallow(<NewsFiltered />).find('NewsFiltered').shallow();
            await newsFiltered.setProps({
                handleChange:  jest.fn(),
                getNewsFiltered: jest.fn().mockReturnValue(
                    jest.fn(() => Promise.resolve({
                        data: { sources: [
                            { category: 'sport', description: 'description2', name: 'name2' },
                            { category: 'sport', description: 'description3', name: 'name3' }
                        ]}
                    }))
                )
            });
        });

        it('It should get the data', ()=> {
            newsFiltered.instance().componentDidMount().then(() => {
                expect(axios.get).toHaveBeenCalled();
                expect(newsFiltered.state()).toHaveProperty('data', [
                    { category: 'test', description: 'description2', name: 'name2' },
                    { category: 'test', description: 'description3', name: 'name3' }
                ]);
            });
        });
    });
});
