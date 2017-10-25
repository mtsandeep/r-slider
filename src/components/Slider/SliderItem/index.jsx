import React from 'react';
import PropTypes from 'prop-types';

const SliderItem = ({ item }) =>
  (
    <div className="slider-item">
      {item.name}
    </div>
  );

SliderItem.propTypes = {
  item: PropTypes.objectof(PropTypes.any).isRequired,
};

export default SliderItem;
