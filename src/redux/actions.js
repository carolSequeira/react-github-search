import {
    FETCH_GITHUB_REPO,
    FETCH_GITHUB_REPO_SUCCESS,
    FETCH_GITHUB_REPO_FAILURE,
    UPDATE_PAGE,
    GO_TO_NEXT_SET,
    GO_TO_PREVIOUS_SET,
    LANGUAGE_CHANGE, INPUT_CHANGE
} from './actionTypes';

export function fetchReposAction(payload) {
    return {
        type: FETCH_GITHUB_REPO,
        payload
    };
}

export function updateLanguage(payload) {
    return {
        type: LANGUAGE_CHANGE,
        payload
    };
}

export function updateInput(payload) {
    return {
        type: INPUT_CHANGE,
        payload
    };
}

export function fetchReposSuccessAction(payload) {
    return {
        type: FETCH_GITHUB_REPO_SUCCESS,
        payload
    };
}

export function fetchReposFailureAction(payload) {
    return {
        type: FETCH_GITHUB_REPO_FAILURE,
        payload
    };
}


export function goToNextPage(payload) {
    return {
        type: GO_TO_NEXT_SET,
        payload
    };
}

export function goToPreviousPage(payload) {
    return {
        type: GO_TO_PREVIOUS_SET,
        payload
    };
}

export function updatePage(payload) {
    return {
        type: UPDATE_PAGE,
        payload
    };
}
