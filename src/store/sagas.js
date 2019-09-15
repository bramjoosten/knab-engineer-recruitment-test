import { put, takeLatest, all, take, call } from 'redux-saga/effects'
import * as actions from 'store/actions'
import axios from 'axios'
import * as actionTypes from './actionTypes'

export function* calculateSaga(action) {

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

    let quotes = Object.assign(
        ...Object.entries(rates).map(([currency, v]) => ({
            [currency]: v * crypto.data.data[action.userInput].quote.USD.price
        }))
    );

    yield put(actions.calculateSuccess({ quotes: quotes, name: crypto.data.data[action.userInput].name }))

}

export function* fetchCryptoSaga(action) {
    yield put(actions.fetchStart())

    try {
        const path = "/v1/cryptocurrency/quotes/latest"
        const symbol = action.value.length === 0 ? '' : `symbol=${action.value}`
        const response = yield axios.get('https://bramjoosten.nl/crypto-converter/proxy/?path=' + path + '&' + symbol)

        if(response.data){
            yield put(actions.fetchCryptoSuccess(response.data))
        }else{
            yield put(actions.fetchFail("error: no data received"))
        }

    } catch (error) {
        console.log("error sideffects")
        yield put(actions.fetchFail(error))
    }
}

export function* fetchFiatSaga() {
    yield put(actions.fetchStart())

    try {
        const response = yield call(axios.get, 'https://api.exchangeratesapi.io/latest?symbols=EUR,GBP,BRL,AUD&base=USD')
        yield put(actions.fetchFiatSuccess(response.data))
    } catch (error) {
        yield put(actions.fetchFail(error))
    }

}


export function* watchSagas() {
    yield all([
        takeLatest(actionTypes.FETCH_CRYPTO, fetchCryptoSaga),
        takeLatest(actionTypes.FETCH_FIAT, fetchFiatSaga),
        takeLatest(actionTypes.CALCULATE, calculateSaga)
    ])
}
