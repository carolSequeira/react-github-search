import React from 'react';

const Button = (props) => {
    return (
        <button
            className={props.buttonStyle}
            type={props.type || 'button'}
            onClick={props.onClick}>{props.children}</button>
    );
};

Button.displayName = 'Button';

export default Button