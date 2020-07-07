import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import './App.scss';

const App = () => {
  return <div id='picture-element-editor'>
    <Header />
    <Main />
    <Footer />
  </div>;
};

export default App;
