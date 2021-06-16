import React from 'react';

const Header = (props) => {
    return (
        <header className={props.headerClass}>
            <img src={props.headLogo} alt="headerIcon" />
            <h1>{props.content}</h1></header>
    );
};


export default Header