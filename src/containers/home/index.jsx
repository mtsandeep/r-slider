import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hotels from './Hotels';
import './style.scss';

class Home extends Component {
  handleStartGame = () => {};

  render() {
    return (
      <div className="home">
        <Header />
        <Hotels />
        <Footer />
      </div>
    );
  }
}

export default Home;
