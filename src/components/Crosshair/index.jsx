import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Crosshair = props =>
  (
    <div className="crosshair__wrapper" style={{ backgroundImage: `url(${props.picture})` }}>
      <div className="crosshair">
        <div className="crosshair__line left" />
        <div className="crosshair__line top" />
        <div className="crosshair__line right" />
        <div className="crosshair__line bottom" />
        <div className="crosshair__inner" />
      </div>
    </div>
  );

Crosshair.defaultProps = {
  picture: null,
};

Crosshair.propTypes = {
  picture: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Crosshair;
