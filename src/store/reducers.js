import * as actionTypes from 'store/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
    loading: false,
    error: null,
    touched: false,
    crypto: null,
    fiat: null
}


const fetchStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const fetchCryptoSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        crypto: action.result
    })
}

const fetchFiatSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        fiat: action.result
    })
}

const fetchCrypto = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    })
}

const fetchFiat = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    })
}

const fetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}


const reducer = (state = initialState, action) => {
    console.log('[reducer]', action)
    switch (action.type) {
        case actionTypes.FETCH_START: return fetchStart(state, action)
        case actionTypes.FETCH_CRYPTO_SUCCESS: return fetchCryptoSuccess(state, action)
        case actionTypes.FETCH_FIAT_SUCCESS: return fetchFiatSuccess(state, action)
        case actionTypes.FETCH_CRYPTO: return fetchCrypto(state, action)
        case actionTypes.FETCH_FIAT: return fetchFiat(state, action)
        case actionTypes.FETCH_FAIL: return fetchFail(state, action)
        default:
            return state
    }
}

export default reducer