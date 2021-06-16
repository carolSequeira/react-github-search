import React from 'react';

const SearchBar = ({searchQuery, placeholder, setSearchQuery}) => {
    const BarStyling = {width:"30rem",background:"#F2F1F9", fontSize: "1rem", border:"none", padding:"0.6rem", borderRadius: "4px"};
    return (
        <input
            style={BarStyling}
            key="random1"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default SearchBar