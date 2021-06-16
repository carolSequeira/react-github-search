import React from 'react';
import "./RepoList.css";
import Moment from 'react-moment';


const RepoList = (props) => {
    const renderRepoList = props.repos.map((repo) => {
        return (
            <li className="item" key={repo.id}>
             <div>
                 <h3>{repo.name}</h3>
                 <p>{repo.description}</p>
                 <span>{repo.language}</span>
                 <span>{repo.license && repo.license.name}</span>
                 <span>Updated:  <Moment fromNow>{repo["updated_at"].slice(0, -1)}</Moment></span>

             </div>
            </li>
        )
    });

    return <ul className="list">{renderRepoList}</ul>;
};

export default RepoList;