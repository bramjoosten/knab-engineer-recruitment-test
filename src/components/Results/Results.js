import React, { useEffect } from 'react'
import classes from './Results.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { CSSTransition,TransitionGroup } from 'react-transition-group'

const Results = (props) => {

    let results = null
    console.log("[Results/props.error]", props.error)
    if (!props.isValid || props.error) {
        props.onClearResult()
    }
    

    if (props.result) {

        results = Object.keys(props.result.quotes).map(currency => {
            var formatter = new Intl.NumberFormat("nl-NL", {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
                localeMatcher: 'best fit'
            })
            console.log(formatter)

            

            const formattedArray = formatter.formatToParts(props.result.quotes[currency])

            const symbol = formattedArray[0].value

            let digits = ''

            formattedArray.forEach(key => {
                if (key.type !== 'currency') {
                    digits += key.value
                }
            });

            return (
                <li key={currency}>
                    <span className={classes.Symbol}>{symbol}</span>
                    <span className={classes.Digits}>{digits}</span>
                </li>
            )
        })
    } else {
        results = null


    }



    return (
        <div className={classes.Wrapper}>
            {console.log("[Results/render]")}
            {props.result ? <p>{"1 "}{props.result.name}{" equals to:"}</p> : null}
            {results}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        result: state.calculatedResult,
        isValid: state.formIsValid,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onClearResult: () => dispatch(actions.calculateClear())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Results)