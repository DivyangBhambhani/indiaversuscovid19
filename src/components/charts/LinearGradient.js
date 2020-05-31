import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: '100%',
    margin: 'auto'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 10
  };
  
  var maxRange = Math.ceil (data.max / 5000) * 5000;
  var divider = maxRange/5000;
  var gap = maxRange/divider;
  var flexdiff = 1/divider;
  var range = [0];
  var adder = 0;
  while (adder < maxRange) {
      adder += gap;
      range.push(adder);
  }

  return (
    <div>
      <div style={boxStyle} className="display-flex">
        {range && range.map((item,index) => (
          <React.Fragment key={index} >
            <span className="font10 text-center">{item}<br/>|</span>
            {(index < (range.length - 1)) &&
              <span style={{'flex': flexdiff}}></span>
            }
          </React.Fragment>
        ))}
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

export default LinearGradient;