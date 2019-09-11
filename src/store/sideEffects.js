import { put, takeLatest, all, take, call } from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios'
import * as actionTypes from './actionTypes'

export function* calculateSaga(action) {

    console.log('[calculateSaga/action]', action)

    //should return object with end results
    yield all([
        put(actions.fetchFiat()),
        put(actions.fetchCrypto(action.userInput)),
    ])

    const [crypto, fiat] = yield all([
        take(actionTypes.FETCH_CRYPTO_SUCCESS),
        take(actionTypes.FETCH_FIAT_SUCCESS)
    ])



    const rates = yield {
        USD: 1,
        ...fiat.data.rates
    }
    yield console.log(crypto)


    let quotes = Object.assign(
        ...Object.entries(rates).map(([currency, v]) => ({
            [currency]: v * crypto.data.quote.USD.price
        }))
    );

    yield put(actions.calculateSuccess({quotes:quotes,name:crypto.data.name}))

}

export function* fetchCryptoSaga(action) {
    console.log("[fetchCryptoSaga]", action)
    yield put(actions.fetchStart())

    try {
        const path = "/v1/cryptocurrency/quotes/latest"
        const symbol = action.value.length === 0 ? '' : `symbol=${action.value}`
        const response = yield call(axios.get, 'https://bramjoosten.nl/crypto-converter/proxy/?path=' + path + '&' + symbol)
        const data = response.data.data[action.value]
        yield put(actions.fetchCryptoSuccess(data))
    } catch (error) {
        yield put(actions.fetchFail(error.toString()))
    }
}

export function* fetchFiatSaga() {
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
        takeLatest(actionTypes.FETCH_CRYPTO, fetchCryptoSaga),
        takeLatest(actionTypes.FETCH_FIAT, fetchFiatSaga),
        takeLatest(actionTypes.CALCULATE, calculateSaga)
    ])
}
