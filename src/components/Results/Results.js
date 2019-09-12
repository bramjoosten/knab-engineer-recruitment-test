import React, { useEffect, useRef } from 'react'
import classes from './Results.module.scss'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { TimelineLite } from 'gsap'

const Results = (props) => {

    let results = null
    const myTween = new TimelineLite()
    const { isAnimating } = props
    const description = useRef(null);
    const myElements = []

    useEffect(() => {
        console.log("[Results/useEffect]")
        console.log(myElements)
        myTween.staggerFromTo(
            myElements,
            0.5,
            { x: -5, opacity: 0, autoAlpha: 1 },
            { x: 0, opacity: 1, autoAlpha: 1 },
            0.1,
            "+=0"
        );

    }, [myElements, myTween, isAnimating])



    

    console.log("[Results/props.error]", props.error)
    if (!props.isValid || props.error) {
        props.onClearResult()    
    }


    if (props.result) {
        
        results = Object.keys(props.result.quotes).map((currency, index) => {
            
            const formatter = new Intl.NumberFormat("nl-NL", {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 4,
                maximumFractionDigits: 4
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
        results = null


    }

    const resultDescription = props.result ? <p className={classes.Description} ref={p => myElements[0] = (p)}>{"1 "}{props.result.name}{" equals to:"}</p> : null

    return (
        <div className={classes.Wrapper}>
            {console.log("[Results/render]")}
            {resultDescription}
            {results}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        result: state.calculatedResult,
        isValid: state.formIsValid,
        loading: state.loading,
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