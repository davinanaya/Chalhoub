import React from 'react';
import TopHeadlines from './TopHeadlines';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: { articles: [
                {title: 'davin', description: 'description1', url: 'http', urlToImage: 'image'},
                {title: 'test', description: 'description1', url: 'http2', urlToImage: 'image2'}
            ]}
        }))
    }
});

// eslint-disable-next-line import/first
import axios from 'axios';

describe('Given a TopHeadlines', ()=> {
    describe('When axios its called', () => {
        let topHeadlines;
        beforeEach( async () => {
            // we look inside our HOC to get the component
            topHeadlines =  shallow(<TopHeadlines />).find('TopHeadlines').shallow();
        });

        it('It should get the data', ()=> {
            topHeadlines.instance().componentDidMount().then(() => {
                expect(axios.get).toHaveBeenCalled();
                expect(topHeadlines.state()).toHaveProperty('topHeadlines', [
                    {title: 'davin', description: 'description1', url: 'http', urlToImage: 'image'},
                    {title: 'test', description: 'description1', url: 'http2', urlToImage: 'image2'}
                ]);
            });
        })

        it('It should check the component data', () => {
            expect(topHeadlines.find('Col')).toHaveLength(2);
        });
    });
});
