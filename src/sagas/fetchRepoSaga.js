import { takeLatest, call, put } from 'redux-saga/effects';


import {
    FETCH_GITHUB_REPO,
    FETCH_GITHUB_REPO_FAILURE,
    FETCH_GITHUB_REPO_SUCCESS,
} from '../redux/actionTypes'

export function* fetchReposWatcher() {
    yield takeLatest(FETCH_GITHUB_REPO, fetchReposWorker);
}

const getRepos = async (payload) => {
    return fetch(`https://api.github.com/search/repositories?sort=stars&order=desc&q=${payload.input} language:${payload.language}`)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            if (data.items && data.items.length) {
                return {
                    data: data.items,
                    totalResults: data['total_count']
                };
            }
            return {
                data: [],
                totalResults: 0
            };
        });
};

export function* fetchReposWorker({ payload }) {
    try {
        const param = { ...payload };
        const data = yield call(getRepos, param);
        yield put({
            type: FETCH_GITHUB_REPO_SUCCESS,
            payload: data
        });
    } catch ({ message }) {
        yield put({
            type: FETCH_GITHUB_REPO_FAILURE,
            payload: message
        });
    }
}

export default fetchReposWatcher;
