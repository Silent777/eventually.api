import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import {shallow, configure, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventEdit from '../../event/EventEdit';


configure({ adapter: new Adapter() });

describe('Component EventEdit Tests', () => {

    const state = {
            eventId: 1,
            teams: [1,2,3],
            open: false,
            teamId: 1,
            owner: 1,
            name: 'Old Name',
            description: 'Old Description',
            startAt: '1509539867',
            duration: '124234',
            budget: 1000,
            status: 0
    }

    const wrapper = shallow(<EventEdit {...state}/>);


    describe('Basic Tests', ()=> {
        it('renders if EventEdit Component exists', () => {
            expect(wrapper.exists()).toEqual(true);
        });

        it('check if render TextField, DatePicker, TimePicker, SelectField exists', () => {
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
    });

    describe ('Change the state tests', () =>{
        it('check input change on state name', () => {
            expect(wrapper.state().name).toEqual("Old Name");
            wrapper.find('#name-input').simulate('Change',{ target: { value: 'New Name'}});
            expect(wrapper.state().name).toBe("New Name");
        });

        it('check input change on state description', () => {
            expect(wrapper.state().description).toEqual("Old Description");
            wrapper.find('#description-input').simulate('Change',{ target: { value: 'New Description'}});
            expect(wrapper.state().description).toBe("New Description");
        });

        it('check input change on state budget', () => {
            expect(wrapper.state().budget).toEqual(1000);
            wrapper.find('#budget-input').simulate('Change',{ target: { value: '3000'}});
            expect(wrapper.state().budget).toBe(3000);
        });

//        it('check input change on state start_at', () => {
//            expect(wrapper.state().startAt).toEqual('1509539867');
//            wrapper.find('#start-date-input').simulate('Change',{ target: {date: new Date('1515151515') }});
//            console.log(wrapper.state().startAt)
//            expect(wrapper.state().startAt).toBe(1515151515);
//        });

//        it('check input change on state status', () => {
//            const wrapper = mount(<EventEdit {...state}/>);
//            expect(wrapper.state().status).toEqual(0);
//            wrapper.find('#status-input').simulate('Select', {target: { value: 1}});
//            console.log(wrapper.state().status)
//            expect(wrapper.find('#status-input').value).toEqual(1);
//        });

    });

    describe ('Check if handleFunctions called', () =>{

         it('check if handleName called', () => {
             const spy = sinon.spy(wrapper.instance(), "handleName");
             wrapper.find('#name-input').simulate('Change',{ target: { value: 'Very New Name'}});
             wrapper.update();
             wrapper.find('#name-input').simulate('Change',{ target: { value: 'Very New Name'}});
             expect(spy.called).toEqual(true);
        });

         it('check if handleDescription called', () => {
             const spy = sinon.spy(wrapper.instance(), "handleDescription");
             wrapper.find('#description-input').simulate('Change',{ target: { value: 'Very New Description'}});
             wrapper.update();
             wrapper.find('#description-input').simulate('Change',{ target: { value: 'Very New Description'}});
             expect(spy.called).toEqual(true);
        });

         it('check if handleStatus called', () => {
             const spy = sinon.spy(wrapper.instance(), "handleStatus");
//             wrapper.instance().handleStatus();
             wrapper.find('#status-input').simulate('Change');
             wrapper.update();
             wrapper.find('#status-input').simulate('Change');
             expect(spy.called).toEqual(true);
        });

        it('check if handleOpen called', () => {
             const spy = sinon.spy(wrapper.instance(), "handleOpen");
             wrapper.find('RaisedButton').simulate('Click');
             wrapper.update();
             wrapper.find('RaisedButton').simulate('Click');
             expect(spy.called).toEqual(true);
        });

        it('check if handleClose called', () => {
             const spy = sinon.spy(wrapper.instance(), "handleClose");
             wrapper.find('Dialog').simulate('RequestClose');
             wrapper.update();
             wrapper.find('Dialog').simulate('RequestClose');
             expect(spy.called).toEqual(true);
        });

    });

    describe('Check Buttons click', () => {
         it('check if click on Edit Button changes state', () => {
            expect(wrapper.state().open).toEqual(false);
            wrapper.find('form').find('RaisedButton').simulate('Click');
            expect(wrapper.state().open).toEqual(true);
        });

         it('check if RequestClose changes state', () => {
             expect(wrapper.state().open).toEqual(true);
             wrapper.find('form').find('Dialog').simulate('RequestClose');
             expect(wrapper.state().open).toEqual(false);
         });

    });

});

