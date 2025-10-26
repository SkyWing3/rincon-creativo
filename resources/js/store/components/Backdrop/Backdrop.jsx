import React from 'react';
import './Backdrop.css';

const Backdrop = ({ click }) => {
  return <div className="backdrop" onClick={click}></div>;
};

export default Backdrop;
