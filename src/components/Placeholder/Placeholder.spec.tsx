import React from 'react';
import { mount } from 'enzyme';
import Placeholder from '.';

test('contains correct text', () => {
    const wrapper = mount(<Placeholder />);
    expect(wrapper.text()).toMatch('COVID-19 is affecting people’s mental health.');
});

test('contains Partner With Us link', () => {
    const wrapper = mount(<Placeholder />);
    expect(wrapper.find('a').get(0).props.href).toBe('mailto:elliot@livefortomorrow.co');
});

test('contains Help us crowdsource helplines link', () => {
    const wrapper = mount(<Placeholder />);
    expect(wrapper.find('a').get(1).props.href).toBe('mailto:anna@livefortomorrow.co');
});

test('contains Join the launch mailing list link', () => {
    const wrapper = mount(<Placeholder />);
    expect(wrapper.find('a').get(2).props.href).toBe('https://zealnz.typeform.com/to/BtdlLP');
});
