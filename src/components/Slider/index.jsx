import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import SliderItem from './SliderItem';
import './style.scss';

class Slider extends Component {
  constructor(...args) {
    super(...args);
    const { items } = this.props;
    this.state = {
      items,
      slide: false,
      slided: false,
      itemsPerSlide: 6,
      currentSlide: 0,
      left: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.items !== nextProps.items) {
      this.setState({
        items: nextProps.items,
      });
    }
  }

  getItems = (currentSlide) => {
    const { items } = this.props;
    const { itemsPerSlide } = this.state;
    const chunks = _.chunk(items, itemsPerSlide);
    const currentItems = chunks[currentSlide];
    const previousItems = currentSlide === 0 ? _.last(chunks) : chunks[currentSlide - 1];
    const nextItems = currentSlide === chunks.length - 1
      ? _.first(chunks)
      : chunks[currentSlide + 1];
    return _.concat(previousItems, currentItems, nextItems);
  }

  getNextSlide = (currentSlide, left = true) => {
    const { items } = this.props;
    const { itemsPerSlide } = this.state;
    const lastSlide = (items.length / itemsPerSlide) - 1; // as slide is based on index
    let nextSlide;
    if (left) { // for left direction slide
      nextSlide = currentSlide === lastSlide ? 0 : currentSlide + 1;
    } else {
      nextSlide = currentSlide === 0 ? lastSlide : currentSlide - 1;
    }
    return nextSlide;
  }

  slideLeft = () => {
    this.setState({
      slide: true,
    });
  }

  slideRight = () => {
    this.setState({
      slide: true,
      items: this.getItems(false),
    });
  }

  handleEntering = () => {
    const { left, slided, currentSlide } = this.state;
    this.setState({
      currentSlide: this.getNextSlide(currentSlide, left),
      contentStyle: {
        transform: slided ? 'translateX(-200%)' : 'translateX(-100%)',
      },
    });
  }

  handleEntered = () => {
    const { currentSlide } = this.state;
    console.log(this.getItems(currentSlide));
    this.setState({
      slide: false,
      slided: true,
      items: this.getItems(currentSlide),
      contentStyle: {
        transform: 'translateX(-100%)',
      },
    });
  }

  render() {
    const { count } = this.props;
    return (
      <div className="slider-wrapper">
        <div className="slider-container">
          <div className="slider-count">
            {count > 0 ? count : null}
          </div>
          <CSSTransition
            classNames="content-slide"
            timeout={{ enter: 5000, exit: 0 }}
            in={this.state.slide}
            onEntering={this.handleEntering}
            onEntered={this.handleEntered}
          >
            <div className="slider-content" style={this.state.contentStyle}>
              {this.state.items.map(item =>
                (
                  <SliderItem key={item.id} item={item} />
                ),
              )}
            </div>
          </CSSTransition>
          <div className="slider-controls">
            <button onClick={this.slideRight}>previous</button>
            <button onClick={this.slideLeft}>next</button>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  count: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Slider;
