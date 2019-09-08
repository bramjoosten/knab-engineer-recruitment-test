import { put, takeEvery, all } from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios'
import * as actionTypes from './actionTypes'

export function* fetchCryptoSaga(action) {
    console.log("[fetchCryptoSaga]", action)
    yield put(actions.fetchStart())

    try {

        const path = "/v1/cryptocurrency/quotes/latest"
        const symbol = action.value.length === 0 ? '' : `symbol=${action.value}`
        const response = yield axios.get('https://bramjoosten.nl/crypto-converter/proxy/?path=' + path + '&' + symbol)
        const result = response.data.data[action.value].quote.USD.price
        console.log("[fetchCryptoSaga: typeof]", typeof (result))
        yield put(actions.fetchCryptoSuccess(result))

    } catch (error) {
        yield put(actions.fetchFail(error.toString()))
    }
}

export function* fetchFiatSaga(action) {
    yield put(actions.fetchStart())
    try {

        const response = yield axios.get('https://api.exchangeratesapi.io/latest?symbols=EUR,GBP,BRL,AUD&base=USD')

        yield put(actions.fetchFiatSuccess(response.data))
    } catch (error) {
        console.log(error)
        yield put(actions.fetchFail(error))
    }
}


export function* watchSideEffects() {
    yield all([
        takeEvery(actionTypes.FETCH_CRYPTO, fetchCryptoSaga),
        takeEvery(actionTypes.FETCH_FIAT, fetchFiatSaga),

    ])
}
