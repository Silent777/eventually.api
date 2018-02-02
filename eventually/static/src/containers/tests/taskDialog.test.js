import React from 'react';
import Dialog from 'material-ui/Dialog';
import TaskDialog from '../eventTaskList/EventTaskDialog'
import EventTaskList from '../eventTaskList/EventTaskList'
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import expect from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'assert';
import chai from 'chai';


Enzyme.configure({ adapter: new Adapter() });

describe('<TaskDialog>', () => {
  it('renders <TaskDialog>', () => {
        const wrapper = shallow(<TaskDialog />);
        assert.equal((wrapper.find(Dialog).length), 1);
  });
  it('opens dialog when button is clicked', () => {
    const wrapper = shallow(<TaskDialog />);
    wrapper.find('FloatingActionButton').simulate('click');
    assert.equal((wrapper.find(Dialog).prop('open')), true);
  });
  it('counts children of Dialog', () => {
    const wrapper = shallow(<TaskDialog />);
    assert.equal((wrapper.find(Dialog).children().length), 4);
  });
  it('counts TextFields in Dialog', () => {
    const wrapper = shallow(<TaskDialog />);
    assert.equal(((wrapper.find(Dialog).children()).find('TextField').length), 2);
  });
  it('counts SelectFields in Dialog', () => {
    const wrapper = shallow(<TaskDialog />);
    assert.equal(((wrapper.find(Dialog).children()).find('SelectField').length), 2);
  });
//  it('counts TextFields in Dialog', () => {
//    const wrapper = shallow(<TaskDialog />);
//    const dialogWrapper = (wrapper.find(Dialog).children()).find('TextField');
//    assert.equal((dialogWrapper.find('#name').length), 1);
//  });

});