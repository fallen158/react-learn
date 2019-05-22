import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PriceList from './components/PriceList';
import Test from './test/a'
import TestB from './test//b'

export const items = [
  {
    id: 1,
    title: '去云南旅游',
    price: 200,
    date: '2018-09-10',
    category: {
      id: 1,
      name: '旅行',
      iconName: 'ios-plane'
    }
  },
  {
    id: 2,
    title: '去日本旅游',
    price: 400,
    date: '2018-09-10',
    category: {
      id: 1,
      name: '旅行',
      iconName: 'ios-plane'
    }
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <PriceList
          items={items}
          onModifyItem={() => alert(1)}
          onDeleteItem={() => alert(2)}
        />
        <Test/>
        <TestB/>
      </div>
    );
  }
}

export default App;
