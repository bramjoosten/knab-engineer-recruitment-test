import React, { useState, useEffect, useRef } from 'react'
import classes from 'App.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

const App = props => {
  // console.log("[App]")

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  const inputChangedHandler = ev => {
    console.log("[inputChangedHandler]", ev.target.value)
    setInputValue(ev.target.value)
  }

  const calculate = (inputValue) => {
    console.log("[calculate]", typeof (inputValue))
    try {
      props.onFetchCrypto(inputValue)
      props.onFetchFiat()

    } catch (error) {
      console.log(error)
    }
  }

  let resultList = "please enter data"

  if (props.fiat && props.crypto) {
    const rates = {
      USD: 1,
      ...props.fiat.rates
    }

    resultList = Object.keys(rates).map(currency =>
      <li key={currency}>{rates[currency] * props.crypto} {currency}</li>
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
      if (inputValue === inputRef.current.value) {
        calculate(inputValue.toUpperCase())
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])


  return (
    <div className={classes.App}>
      {console.log("[render]")}
      <p>{errorMessage}</p>
      <form className={classes.Form} >
        <label htmlFor="input">insert your 3-letter crypto code</label>
        <div className={classes.InputField}>
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
    touched: state.touched,
    crypto: state.crypto,
    fiat: state.fiat
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchCrypto: (value) => dispatch(actions.fetchCrypto(value)),
    onFetchFiat: (value) => dispatch(actions.fetchFiat(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 