import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class SliderItem extends Component {
  handleMouseEnter = () => {
    const { onMouseEnter, item } = this.props;
    onMouseEnter(item);
  }

  handleMouseLeave = () => {
    const { onMouseLeave, item } = this.props;
    onMouseLeave(item);
  }

  handleClick = () => {
  }

  render() {
    const { item, style } = this.props;
    return (
      <div
        className="slider-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={style}
        role="button"
        tabIndex="0"
      >
        <div className="title"><h2>{item.name}</h2></div>
        <div className="item-image" style={{ background: `url(/public/images/hotels/${item.images[0]}) no-repeat` }} />
      </div>
    );
  }
}

SliderItem.defaultProps = {
  style: {},
};

SliderItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SliderItem;
