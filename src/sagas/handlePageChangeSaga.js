import { takeLatest, call, put } from 'redux-saga/effects';


import {
    GO_TO_NEXT_SET,
    NEXT_SET_CHANGE_SUCCESS,
    NEXT_SET_CHANGE_FAILURE
} from '../redux/actionTypes'

export function* handlePageChangeWatcher() {
    yield takeLatest(GO_TO_NEXT_SET, handlePageChangeWorker);
}

const getNextRepos = async (payload) => {
    return fetch(`https://api.github.com/search/repositories?sort=stars&order=desc&q=${payload.input} 
    language:${payload.language}&page=${payload.page}&per_page=30`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length) {
                return {
                    page: payload.page,
                    data: data.items
                };
            }
            return {
                page: payload.page,
                data: []
            };
        });
};

export function* handlePageChangeWorker({ payload }) {
    try {
        const param = { ...payload };
        const data = yield call(getNextRepos, param);
        console.log(data);
        yield put({
            type: NEXT_SET_CHANGE_SUCCESS,
            payload: data
        });
    } catch ({ message }) {
        yield put({
            type: NEXT_SET_CHANGE_FAILURE,
            payload: message
        });
    }
}

export default handlePageChangeWorker;
