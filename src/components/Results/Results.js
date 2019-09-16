import React, { useEffect, useRef } from 'react'
import classes from './Results.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { TimelineLite } from 'gsap'

const Results = (props) => {

    let results, resultDescription = null
    const myTween = new TimelineLite()
    const { isAnimating } = props
    const description = useRef(null);
    const myElements = []

    useEffect(() => {
        myTween.staggerFromTo(
            myElements,
            0.5,
            { x: -5, opacity: 0, autoAlpha: 1 },
            { x: 0, opacity: 1, autoAlpha: 1 },
            0.1,
            "+=0"
        );

    }, [myElements, myTween, isAnimating])

    // clear result so user gets immediate feedback if there's something wrong with an inputvalue
    if (!props.isValid || props.error) {
        props.onClearResult()
    }


    if (props.result) {

        resultDescription = (
            <p className={classes.Description} ref={p => myElements[0] = (p)}>
                {"1 "}{props.result.name}{" equals to:"}
            </p>
        )

        results = Object.keys(props.result.quotes).map((currency, index) => {

            const formatter = new Intl.NumberFormat("nl-NL", {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 4,
                maximumFractionDigits: 4
            })

            const formattedString = formatter.format(props.result.quotes[currency])
            const [symbol, , digits] = formattedString.split(/(\s)/)

            return (

                <li
                    key={currency}
                    ref={li => myElements[index + 1] = li}>
                    <span className={classes.Symbol}>{symbol}</span>
                    <span className={classes.Digits}>{digits}</span>
                </li>

            )
        })
        myElements.unshift(description.current)

    } else {
        results = resultDescription = null
    }



    return (
        <div className={classes.Wrapper}>
            {resultDescription}
            {results}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        result: state.calculatedResult,
        isValid: state.formIsValid,
        error: state.error,
        isAnimating: state.isAnimating
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onClearResult: () => dispatch(actions.calculateClear()),
        onSetAnimating: (bool) => dispatch(actions.setAnimating(bool))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Results)