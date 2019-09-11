import React, { useState, useEffect, useRef } from 'react'
import classes from './Form.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { checkValidity } from 'shared/utility'

const Form = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const inputRef = useRef()

    const inputChangedHandler = ev => {
        console.log("[inputChangedHandler]", ev.target.value)
        setInputValue(ev.target.value)
        setIsTouched(true)
        const validity = checkValidity(ev.target.value, { required: true, minLength: 3 })
        if(validity !== props.isValid){
            props.onSetValidity(validity)
        }
    }


    let errorMessage = 'no error'
    if (props.error) {
        errorMessage = props.error
    }
    
    


    useEffect(() => {
        console.log("[useEffect]")
        const timer = setTimeout(() => {
            if (props.isValid && isTouched && inputValue === inputRef.current.value) {
                props.onCalculate(inputValue.toUpperCase())
            }
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, isTouched])

    return (
        <form className={classes.Form} >
            <label htmlFor="input">insert your 3-letter crypto code</label>
            <div className={classes.InputField} valid={props.isValid ? "valid" : null}>
                <input
                    ref={inputRef}
                    id="input"
                    type="text"
                    placeholder="e.g. BTC"
                    value={inputValue}
                    onChange={inputChangedHandler}
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
      onSetValidity: (isValid) => dispatch(actions.setValidate(isValid))
    }
  }


  export default connect(mapStateToProps,mapDispatchToProps)(Form)