import {
    FETCH_GITHUB_REPO,
    FETCH_GITHUB_REPO_FAILURE,
    FETCH_GITHUB_REPO_SUCCESS,
    UPDATE_PAGE,
    GO_TO_NEXT_SET,
    GO_TO_PREVIOUS_SET, NEXT_SET_CHANGE_FAILURE, NEXT_SET_CHANGE_SUCCESS,
    PREVIOUS_SET_CHANGE_SUCCESS,
    PREVIOUS_SET_CHANGE_FAILURE
} from '../actionTypes';

export const initialState = {
    repos: [],
    language: '',
    input: '',
    totalItems: 0,
    page: 1,
    pageSize: 50,
    totalPages: 0
};

export default function fetchReposReducer(
    state = initialState,
    { type, payload }
) {
    switch (type) {
        case FETCH_GITHUB_REPO:
            return { ...state };

        case FETCH_GITHUB_REPO_SUCCESS:
            return {
                ...state,
                repos: payload.data,
                totalItems: payload.totalResults,
                totalPages: Math.floor(payload.totalResults / state.pageSize),
            };

        case FETCH_GITHUB_REPO_FAILURE:
            return {
                ...state,
                error: payload
            };
        case UPDATE_PAGE:
            return {
                ...state,
                page: payload.page,
            };

        case NEXT_SET_CHANGE_SUCCESS:
            return {
                ...state,
                page: payload.page,
                repos: state.repos.concat(payload.data)
            };
        case NEXT_SET_CHANGE_FAILURE:
            return {
                ...state,
                payload
            };
        case GO_TO_NEXT_SET:
            return {
                ...state,
                page: payload.page
            };
        case GO_TO_PREVIOUS_SET: {
            return {
                ...state,
                page: payload.page
            };
        }
        case PREVIOUS_SET_CHANGE_SUCCESS:
            return {
                ...state,
                page: payload.page,
                repos: payload.data
            };
        case PREVIOUS_SET_CHANGE_FAILURE:
            return {
                ...state,
                payload
            };

        default:
            return state;
    }
}