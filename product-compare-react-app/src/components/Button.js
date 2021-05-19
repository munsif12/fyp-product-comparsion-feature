import React from 'react';

const Button = (props) => {
    return (
        
        <button className="general-btn" onClick={props.onClick} disabled={props.isDisabled} 
        style={props.style}>{props.text}</button>
    );
};

Button.defaultProps = {
    message : 'Click Me!'
};

export default Button ;