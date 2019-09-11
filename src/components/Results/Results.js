import React, { useEffect } from 'react'
import classes from './Results.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

const Results = (props) => {

    let results = "please enter data"


    if (!props.isValid) {
        props.onClearResult()
    }

    if (props.result) {

        results = Object.keys(props.result.quotes).map(currency => {
            var formatter = new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
                localeMatcher: 'best fit'
            })

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
                    <span className="symbol">{symbol}</span>
                    <span className="digits">{digits}</span>
                </li>
            )
        })
    } else {
        results = "please enter data"


    }

    return (
        <div className={classes.Wrapper}>
            {props.result ? <p>{"1 "}{props.result.name}{" equals:"}</p> : null}
            {results}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        result: state.calculatedResult,
        isValid: state.formIsValid
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onClearResult: () => dispatch(actions.calculateClear())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Results)