import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import {shallow, configure, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventEdit from '../event/EventEdit';

configure({ adapter: new Adapter() });

describe('Component EventEdit', () => {

    const wrapper = shallow(<EventEdit />);

    it('renders if EventEdit Component exists', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('check if render TextField, DatePicker, TimePicker, SelectField', () => {
        expect(wrapper.find('TextField').exists()).toEqual(true);
        expect(wrapper.find('SelectField').exists()).toEqual(true);
        expect(wrapper.find('DatePicker').exists()).toEqual(true);
        expect(wrapper.find('TimePicker').exists()).toEqual(true);

    });

    it('check the quantity of TextField', () => {
        expect(wrapper.find('TextField').length).toEqual(3);
    });

    it('check the quantity of SelectField', () => {
        expect(wrapper.find('SelectField').length).toEqual(2);
    });

    it('check the quantity of DatePicker', () => {
        expect(wrapper.find('DatePicker').length).toEqual(2);
    });

    it('check the quantity of TimePicker', () => {
        expect(wrapper.find('TimePicker').length).toEqual(2);
    });

    it('handles input change on state name', () => {
        expect(wrapper.state().name).not.toEqual("New Name");
        wrapper.find('.name-input').simulate('Change',{ target: { value: 'New Name'}});
        expect(wrapper.state().name).toBe("New Name");
    });

    it('handles input change on state description', () => {
        const wrapper = shallow(<EventEdit />);
        expect(wrapper.state().description).not.toEqual("New Description");
        wrapper.find('.description-input').simulate('Change',{ target: { value: 'New Description'}});
        expect(wrapper.state().description).toBe("New Description");
    });

    it('handles input change on state budget', () => {
        const wrapper = shallow(<EventEdit />);
        expect(wrapper.state().budget).not.toEqual("1000");
        wrapper.find('.budget-input').simulate('Change',{ target: { value: '1000'}});
        expect(wrapper.state().budget).toBe(1000);
    });

    it('checks Dialog buttons to close', () => {
        wrapper.setState({open: true});
        wrapper.find('.dialog-buttons').simulate('RequestClose');
        expect(wrapper.state().open).toEqual(false);
    });


    it('handles input change on state status', () => {
//        const handleStatusSpy = sinon.spy();
        const wrapper = shallow(<EventEdit handleStatus={handleStatusSpy}/>);
        const handleStatusSpy = sinon.spy( wrapper.instance() , 'handleStatus');
        wrapper.update();
        wrapper.find('.status-input').simulate('Change', { target: { value: 1}});
        expect(handleStatusSpy).toHaveBeenCalled();
//           expect(wrapper.find('.status-input').props().value).toBe(1);
    });
//
//
//    it('handles input change on state start_at', () => {
//        const wrapper = shallow(<EventEdit />);
//        wrapper.find('.start_at-input').simulate('change',{ target: {value: '3600' }});
//        expect(wrapper.state().start_at).toBe(3600);
//    });

});

