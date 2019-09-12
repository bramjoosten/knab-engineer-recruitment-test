import * as actionTypes from './actionTypes'

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    }
}

export const fetchCrypto = (value) => {
    return {
        type: actionTypes.FETCH_CRYPTO,
        value: value
    }
}

export const fetchFiat = (value) => {
    return {
        type: actionTypes.FETCH_FIAT,
        value: value
    }
}

export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    }
}

export const fetchCryptoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_CRYPTO_SUCCESS,
        data: data
    }
}
export const fetchFiatSuccess = (data) => {
    return {
        type: actionTypes.FETCH_FIAT_SUCCESS,
        data: data
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

export const calculateClear = () => {
    return {
        type: actionTypes.CALCULATE_CLEAR
    }
}

export const setValidate = (bool) => {
    return {
        type: actionTypes.VALIDATE_SET,
        isValid: bool
    }
}

export const setAnimating = (bool) => {
    return {
        type: actionTypes.ANIMATING_SET,
        isAnimating: bool
    }
}