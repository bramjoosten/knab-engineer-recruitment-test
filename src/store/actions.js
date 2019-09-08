import * as actionTypes from './actionTypes'

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    }
}

//used as onFetchCrypto in App.js
export const fetchCrypto = (value) => {
    return {
        type: actionTypes.FETCH_CRYPTO,
        value: value
    }
}

//used as onFetchFiat in App.js
export const fetchFiat = (value) => {
    return {
        type: actionTypes.FETCH_FIAT,
        value: value
    }
}

export const fetchFail = (error) => {
    // console.log("[actions/fetchQuoteFail]",error)
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    }
}

export const fetchCryptoSuccess = (result) => {
    // console.log("[actions/fetchQuoteSuccess]",value)
    return {
        type: actionTypes.FETCH_CRYPTO_SUCCESS,
        result: result
    }
}
export const fetchFiatSuccess = (result) => {
    // console.log("[actions/fetchQuoteSuccess]",value)
    return {
        type: actionTypes.FETCH_FIAT_SUCCESS,
        result: result
    }
}


