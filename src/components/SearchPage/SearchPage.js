import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RepoList from '../RepoList/RepoList';
import Select from 'react-select'
import "./SearchPage.css";
import Button from "../Button/Button";
import Pagination from '../Pagination/Pagination';
import logo from '../../images/Octocat.png';
import headLogo from '../../images/pngwing.png'

import { connect } from 'react-redux';
import {
    fetchReposAction,
    goToPreviousPage,
    updatePage,
    goToNextPage
} from "../../redux/actions";
import Header from "../Header/Header";


export const SearchPage = (props) => {

    const options = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'php', label: 'PHP' }
    ];

    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('');
    const [itemsPerPage] = useState(5);
    const [currentPage, setcurrentPage] = useState(1);
    const [pageNumberLimit] = useState(6);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(6);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.repoList.slice(indexOfFirstItem, indexOfLastItem);


    const updateInput = (input) => {
        setInput(input);
    };

    const updateLanguage = (languageOption) => {
        setLanguage(languageOption.value);
    };

    const updatePage = (event) => {
        setcurrentPage(Number(event.target.id));
        props.updatePage(Number(event.target.id))
    };

    const handleSubmit = async (event) => {
        if (input === '' && language === '') {
            return;
        }
        event.persist();
        event.preventDefault();
        event.stopPropagation();
        props.fetchReposAction(props.input, props.language);
    };

    const nextPage = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            props.goToNextPage(currentPage + 1);
        } else {
            props.updatePage(currentPage + 1);
        }
    };

    const previousPage = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            props.goToPreviousPage(currentPage - 1);
        } else {
            props.updatePage(currentPage - 1);
        }
    };



    useEffect(() => {
        if (!input) {
            return;
        }
        const fetchData = async () => {
            return await props.fetchReposAction();
        };

        fetchData();

    }, []);

    return (
        <div className="search-container">
            <Header content="Github Repositories"
                headLogo={headLogo}
                headerClass="search-header" />
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="search-label">Language:</div>

                    <div className="form-element">
                        <Select
                            className="select-box"
                            placeholder="Select language..."
                            onChange={updateLanguage}
                            options={options}
                        />
                    </div>
                    <div className="search">
                        <SearchBar
                            searchQuery={input}
                            setSearchQuery={updateInput}
                            placeholder="Find a repository..."
                        />
                        <Button id="submitButton" buttonStyle="search-button" type="submit">Search</Button>
                    </div>
                </form>
            </div>
            <div className="list-container">

                {props.repoList.length === 0 ? (

                    < img src={logo} className="search-empty-logo" alt="logo" />
                ) : (
                    <>
                        <h2> {props.totalItems} repository results </h2>

                        <RepoList className="list-container-element" repos={currentItems} />
                        <div className="pagination">
                            <Pagination
                                pages={props.pageSize}
                                page={props.page}
                                onChangePage={updatePage}
                                maxPageNumberLimit={maxPageNumberLimit}
                                minPageNumberLimit={minPageNumberLimit}
                                totalResults={props.totalItems}
                                goToNextPage={nextPage}
                                goToPreviousPage={previousPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        repoList: state.fetchReposReducer.repos,
        error: state.fetchReposReducer.error,
        totalItems: state.fetchReposReducer.totalItems,
        totalPages: state.fetchReposReducer.totalPages,
        pageSize: state.fetchReposReducer.pageSize,
        page: state.fetchReposReducer.page
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchReposAction: (input, language) => {
            dispatch(fetchReposAction({ input, language }));
        },
        goToPreviousPage: (page) => {
            dispatch(goToPreviousPage({ page }));
        },
        goToNextPage: (page) => {
            dispatch(goToNextPage({ page }));
        },
        updatePage: (page) => {
            dispatch(updatePage({ page }));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);

