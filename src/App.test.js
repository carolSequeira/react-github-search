import { render, screen } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { SearchPage } from './components/SearchPage/SearchPage.js';
import Select from 'react-select';
import SearchBar from './components/SearchBar/SearchBar';
import Button from './components/Button/Button';
import Header from './components/Header/Header';

const fetchReposAction = jest.fn();
const updateInput = jest.fn();
const updateLanguage = jest.fn();

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders search page", () => {
  const arr = [];
  const wrapper = shallow(<SearchPage repoList={arr} />);
  expect(wrapper.find(Header).exists()).toEqual(true);
});


it('searches for repos', () => {
  const repoList = [];
  const initProps = {
    repoList, fetchReposAction, updateInput, updateLanguage
  };
  const wrapper = mount(<SearchPage {...initProps} />);
  wrapper.find('Select').instance().selectOption({ value: 'javascript', label: 'JavaScript' });
  expect(wrapper.find('Select').text()).toEqual('JavaScript');
});


it('enter repo name', () => {
  const repoList = [];
  const initProps = {
    repoList, fetchReposAction, updateInput, updateLanguage
  };
  const wrapper = mount(<SearchPage {...initProps} />);
  wrapper.find(SearchBar).find('input').simulate('change', { target: { value: 'free' } });
  expect(wrapper.find(SearchBar).find('input').prop('value')).toBe('free');
});

it('submit fails', () => {
  const repoList = [];
  const initProps = {
    repoList, fetchReposAction, updateInput, updateLanguage
  };
  const wrapper = mount(<SearchPage {...initProps} />);
  const button = wrapper.find('Button');
  button.simulate('submit');
  expect(fetchReposAction).toHaveBeenCalledTimes(0);
});

it('fetches some repos', () => {
  const repoList = [];
  const initProps = {
    repoList, fetchReposAction, updateInput, updateLanguage
  };
  const wrapper = mount(<SearchPage {...initProps} />);
  wrapper.find('Select').instance().selectOption({ value: 'javascript', label: 'JavaScript' });
  const button = wrapper.find('Button');
  button.simulate('submit');
  expect(fetchReposAction).toHaveBeenCalled();
})