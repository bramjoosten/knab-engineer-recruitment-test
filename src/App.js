import React, { useState, useEffect, useRef } from 'react'
import classes from 'App.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { checkValidity } from 'shared/utility'

const App = props => {
  // console.log("[App]")
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef()

  const inputChangedHandler = ev => {
    console.log("[inputChangedHandler]", ev.target.value)
    setInputValue(ev.target.value)
    setIsTouched(true)
    const validity = checkValidity(ev.target.value, { required: true, minLength: 3 })
    setIsValid(validity)
  }



  let resultList = "please enter data"

  if (props.result) {
    
    resultList = Object.keys(props.result).map(currency =>
      <li key={currency}>{[currency]}:{props.result[currency]}</li>
    )
  } else {

  }

  let errorMessage = 'no error'
  if (props.error) {
    errorMessage = props.error
  }



  useEffect(() => {
    console.log("[useEffect]")
    const timer = setTimeout(() => {
      if (isValid && isTouched && inputValue === inputRef.current.value) {
        props.onCalculate(inputValue.toUpperCase())
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])


  return (
    <div className={classes.App}>
      {console.log("[render]")}
      {/* <p>{errorMessage}</p> */}
      <form className={classes.Form} >
        <label htmlFor="input">insert your 3-letter crypto code</label>
        <div className={classes.InputField} valid={isValid ? "valid" : null}>
          <input
            ref={inputRef}
            id="input"
            type="text"
            placeholder="e.g. BTC"
            value={inputValue}
            onChange={inputChangedHandler}></input>

        </div>
      </form>
      <br />
      <div className={classes.Result}>
        {resultList}
      </div>
    </div>
  );

}


const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    result: state.calculatedResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCalculate: (value) => dispatch(actions.calculate(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 