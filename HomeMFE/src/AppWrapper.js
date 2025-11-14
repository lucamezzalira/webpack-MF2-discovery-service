import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const AppWrapper = (props) => {
  const containerRef = (node) => {
    if (node) {
      ReactDOM.render(<App {...props} />, node);
    }
  };

  return React.createElement('div', { ref: containerRef });
};

export default AppWrapper;