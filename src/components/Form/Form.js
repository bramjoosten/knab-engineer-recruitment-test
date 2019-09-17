import React, { useState, useEffect, useRef } from 'react'
import classes from './Form.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { checkValidity } from 'shared/utility'
import Spinner from 'components/Spinner/Spinner'

const Form = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const { isValid, onCalculate } = props
    const inputRef = useRef()

    const inputChangedHandler = ev => {
        //should always check for validity
        const validity = checkValidity(ev.target.value, { required: true, minLength: 3 })

        setInputValue(ev.target.value)
        setIsTouched(true)


        //clear the result whenever we can, so we don't get flickering between queries.
        props.onClearResult()
        if (validity !== isValid) {
            props.onSetValidity(validity)
        }
    }

    useEffect(() => {
        //wait a short while between keystrokes to prevent sending too much requests at once
        const timer = setTimeout(() => {
            if (isValid && isTouched && inputValue === inputRef.current.value) {
                onCalculate(inputValue.toUpperCase())
                if (typeof window.orientation !== 'undefined') {
                    inputRef.current.blur()
                }
            }
        }, 150)
        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, isTouched, isValid, onCalculate])


    return (
        <div className={classes.Wrapper}  >
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="input">Enter your crypto code</label>
                <div className={classes.InputField} valid={props.isValid ? "valid" : null}>
                    <input
                        type="search"
                        ref={inputRef}
                        id="input"
                        placeholder={"e.g. \"btc\""}
                        onChange={inputChangedHandler}
                        spellCheck="false"
                        autoComplete="off"
                        autoFocus>
                    </input>
                </div>
            </form>
            <Spinner className={classes.Spinner} loading={props.loading} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isValid: state.formIsValid,
        result: state.result,
        loading: state.loading
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