import * as actionTypes from 'store/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
    loading: false,
    error: null,
    formIsValid: false,
    calculatedResult: null,
    isAnimating:false
}


const fetchStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}


const fetchSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    })
}



const calculateSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        calculatedResult: action.result
    })
}

const fetchFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const calculateClear = (state, action) => {
    return updateObject(state, {
        calculatedResult: null,
        error:null
    })
}

const setValidate = (state,action)=>{
    return updateObject(state,{
        formIsValid: action.isValid
    })
}

const setAnimating = (state,action)=>{
    return updateObject(state,{
        isAnimating: action.isAnimating
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START: return fetchStart(state, action)
        case actionTypes.FETCH_CRYPTO_SUCCESS: return fetchSuccess(state, action)
        case actionTypes.FETCH_FIAT_SUCCESS: return fetchSuccess(state, action)
        case actionTypes.FETCH_FAIL: return fetchFail(state, action)
        case actionTypes.CALCULATE_SUCCESS: return calculateSuccess(state, action)
        case actionTypes.CALCULATE_CLEAR: return calculateClear(state,action)
        case actionTypes.VALIDATE_SET: return setValidate(state,action)
        case actionTypes.ANIMATING_SET: return setAnimating(state,action)
        default:
            return state
    }
}

export default reducer