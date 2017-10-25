import React from 'react';
import PropTypes from 'prop-types';

import SliderItem from './SliderItem';
import './style.scss';

const Slider = ({ count, items }) =>
  (
    <div className="slider-wrapper">
      {count > 0 ? count : null}
      {items.map(item =>
        (
          <SliderItem key={item.id} item={item} />
        ),
      )}
    </div>
  );

Slider.propTypes = {
  count: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Slider;
