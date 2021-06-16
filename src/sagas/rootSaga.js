import { all, fork } from 'redux-saga/effects';
import HandlePageChangeSaga from './handlePageChangeSaga'
import FetchRepoSaga from './fetchRepoSaga';

export default function* (){
    yield all([
        ...FetchRepoSaga, ...HandlePageChangeSaga
    ].map[fork])
}
