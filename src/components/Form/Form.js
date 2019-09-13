import React, { useState, useEffect, useRef } from 'react'
import classes from './Form.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { checkValidity } from 'shared/utility'

const Form = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const { isValid, onCalculate } = props
    const inputRef = useRef()

    const inputChangedHandler = ev => {
        setInputValue(ev.target.value)
        setIsTouched(true)

        const validity = checkValidity(ev.target.value, { required: true, minLength: 3 })
        props.onClearResult()

        if (validity !== props.isValid) {

            props.onSetValidity(validity)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isValid && isTouched && inputValue === inputRef.current.value) {
                onCalculate(inputValue.toUpperCase())
                if (typeof window.orientation !== 'undefined') {
                    inputRef.current.blur()
                }
            }
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, isTouched, isValid, onCalculate])


    return (
        <form className={classes.Wrapper} onSubmit={(ev) => ev.preventDefault()}>
            <label htmlFor="input">Type your crypto code</label>
            <div className={classes.InputField} valid={props.isValid ? "valid" : null}>
                <input
                    type="search"
                    ref={inputRef}
                    id="input"
                    placeholder={"e.g. \"btc\""}
                    value={inputValue}
                    onChange={inputChangedHandler}
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus></input>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        result: state.calculatedResult,
        isValid: state.formIsValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCalculate: (value) => dispatch(actions.calculate(value)),
        onSetValidity: (isValid) => dispatch(actions.setValidate(isValid)),
        onClearResult: () => dispatch(actions.calculateClear())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)