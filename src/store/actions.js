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

export const fetchCryptoSuccess = (quote) => {
    // console.log("[actions/fetchQuoteSuccess]",value)
    return {
        type: actionTypes.FETCH_CRYPTO_SUCCESS,
        quote: quote
    }
}
export const fetchFiatSuccess = (quotes) => {
    // console.log("[actions/fetchQuoteSuccess]",value)
    return {
        type: actionTypes.FETCH_FIAT_SUCCESS,
        quotes: quotes
    }
}

export const calculateStart = () => {
    return {
        type: actionTypes.CALCULATE_START
    }
}

export const calculateSuccess = (result) => {
    return {
        type: actionTypes.CALCULATE_SUCCESS,
        result: result
    }
}

export const calculate = (userInput) => {
    return {
        type: actionTypes.CALCULATE,
        userInput: userInput
    }
}

export const calculateFail = (error) => {
    return {
        type: actionTypes.CALCULATE_FAIL,
        error: error
    }
}

