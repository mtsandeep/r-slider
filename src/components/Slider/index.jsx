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

  appendLastItem = (currentSlide, left = true) => {
    const { items } = this.props;
    const { itemsPerSlide } = this.state;
    const chunks = _.chunk(items, itemsPerSlide);
    const previousItems = currentSlide === 0 ? _.last(chunks) : chunks[currentSlide - 1];
    const nextItems = currentSlide === chunks.length - 1
      ? _.first(chunks)
      : chunks[currentSlide + 1];
    let lastItem;
    if (left) {
      lastItem = _.first(nextItems);
    } else {
      lastItem = _.last(previousItems);
    }
    return lastItem;
  }

  slideLeft = () => {
    const { slided, currentSlide, items } = this.state;
    const left = true;
    const nextSlide = this.getNextSlide(currentSlide, left);
    this.setState({
      slide: true,
      left,
      items: slided ? _.concat(items, this.appendLastItem(nextSlide, left)) : items,
    });
  }

  slideRight = () => {
    const { slided, currentSlide, items } = this.state;
    const left = false;
    const nextSlide = this.getNextSlide(currentSlide, left);
    const lastItem = this.appendLastItem(nextSlide, left);
    const prevLastItem = [
      {
        ...lastItem,
        itemWrapperStyle: { position: 'absolute', transform: 'translateX(-100%)', transitionDuration: '0s' },
      },
    ];
    this.setState({
      slide: true,
      left,
      items: slided ? _.concat(prevLastItem, items) : items,
    });
  }

  handleEntering = () => {
    const { left, slided, currentSlide } = this.state;
    let contentStyle = {};
    if (left && !slided) {
      contentStyle = {
        transform: 'translateX(-100%)',
      };
    }
    this.setState({
      currentSlide: this.getNextSlide(currentSlide, left),
      slided: true,
      contentStyle,
    });
  }

  handleEntered = () => {
    const { currentSlide } = this.state;
    this.setState({
      slide: false,
      items: this.getItems(currentSlide),
      contentStyle: {
        transform: 'translateX(-100%)',
      },
    });
  }

  handleMouseEnter = (currentItem) => {
    const { items, itemsPerSlide } = this.state;
    const currentItemIndex = _.findIndex(items, { id: currentItem.id });
    const preItems = _.slice(items, 0, currentItemIndex);
    const postItems = _.slice(items, currentItemIndex + 1, items.length);

    let preItemsStyle;
    let postItemsStyle;
    let currentItemStyle;
    if (currentItemIndex % itemsPerSlide === 0) {
      preItemsStyle = { transform: 'translate3d(0,0,0)' };
      postItemsStyle = { transform: 'translate3d(50%,0,0)' };
      currentItemStyle = { transform: 'scale(1.5)', transformOrigin: 'left center' };
    } else if (currentItemIndex % itemsPerSlide === itemsPerSlide - 1) {
      preItemsStyle = { transform: 'translate3d(-50%,0,0)' };
      postItemsStyle = { transform: 'translate3d(0,0,0)' };
      currentItemStyle = { transform: 'scale(1.5)', transformOrigin: 'right center' };
    } else {
      preItemsStyle = { transform: 'translate3d(-25%,0,0)' };
      postItemsStyle = { transform: 'translate3d(25%,0,0)' };
      currentItemStyle = { transform: 'scale(1.5)', transformOrigin: 'center center' };
    }
    const newItems = _.concat(
      preItems.map(preItem =>
        ({ ...preItem, itemStyle: { ...preItemsStyle } }),
      ),
      [{ ...items[currentItemIndex], itemStyle: { ...currentItemStyle } }],
      postItems.map(postItem =>
        ({ ...postItem, itemStyle: { ...postItemsStyle } }),
      ),
    );
    this.setState({
      items: newItems,
    });
  }


  handleMouseLeave = (currentItem) => {
    const { items, itemsPerSlide } = this.state;
    const currentItemIndex = _.findIndex(items, { id: currentItem.id });
    const preItems = _.slice(items, 0, currentItemIndex);
    const postItems = _.slice(items, currentItemIndex + 1, items.length);

    let preItemsStyle;
    let postItemsStyle;
    let currentItemStyle;
    if (currentItemIndex % itemsPerSlide === 0) {
      preItemsStyle = { transform: 'translate3d(0,0,0)' };
      postItemsStyle = { transform: 'translate3d(0,0,0)' };
      currentItemStyle = { transform: 'scale(1)', transformOrigin: 'left center' };
    } else if (currentItemIndex % itemsPerSlide === itemsPerSlide - 1) {
      preItemsStyle = { transform: 'translate3d(0,0,0)' };
      postItemsStyle = { transform: 'translate3d(0,0,0)' };
      currentItemStyle = { transform: 'scale(1)', transformOrigin: 'right center' };
    } else {
      preItemsStyle = { transform: 'translate3d(0,0,0)' };
      postItemsStyle = { transform: 'translate3d(0,0,0)' };
      currentItemStyle = { transform: 'scale(1)', transformOrigin: 'center center' };
    }
    const newItems = _.concat(
      preItems.map(preItem =>
        ({ ...preItem, itemStyle: { ...preItemsStyle } }),
      ),
      [{ ...items[currentItemIndex], itemStyle: { ...currentItemStyle } }],
      postItems.map(postItem =>
        ({ ...postItem, itemStyle: { ...postItemsStyle } }),
      ),
    );
    this.setState({
      items: newItems,
    });
  }

  handleClick = (item) => {
    this.setState({
      activeItem: item.id,
    });
  }

  render() {
    const { items, slide, contentStyle, activeItem, left } = this.state;
    const contentSlideDirection = left ? 'content-slide-left' : 'content-slide-right';
    return (
      <div className="slider-wrapper">
        <div className="slider-container">
          <CSSTransition
            classNames={contentSlideDirection}
            timeout={{ enter: 2000, exit: 0 }}
            in={slide}
            onEntering={this.handleEntering}
            onEntered={this.handleEntered}
          >
            <div className="slider-content" style={contentStyle}>
              {items.map(item =>
                (
                  <SliderItem
                    style={item.itemStyle}
                    wrapperStyle={item.itemWrapperStyle}
                    key={item.id}
                    item={item}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                    active={item.id === activeItem}
                  />
                ),
              )}
            </div>
          </CSSTransition>
          <div className="slider-controls">
            { this.state.slided && <div className="previous"><button onClick={this.slideRight}>previous</button></div> }
            <div className="next"><button onClick={this.slideLeft}>next</button></div>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Slider;
