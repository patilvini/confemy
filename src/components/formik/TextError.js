import React from 'react';
import './textError.styles.scss';

function TextError(props) {
  return <div className='error caption-3'>{props.children}</div>;
}

export default TextError;
