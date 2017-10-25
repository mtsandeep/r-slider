import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const SliderItem = ({ item }) =>
  (
    <div className="slider-item">
      {item.name}
    </div>
  );

SliderItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SliderItem;
