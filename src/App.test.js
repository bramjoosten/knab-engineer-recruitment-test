import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//if btc, expect result
//if doge, expect result with 4 decimals
//if eth, expect different result, result should be emptied before
//if et, expect no result, because not enough chars, expect: please enter 3 digits
//if etx (or non-existing crypto), expect "this crypto is not found"
//if loading, expect spinner