import React from 'react'
import { ReactComponent as SpinnerImg } from 'assets/spinner.svg'
import classes from './Spinner.module.scss'

const Spinner = (props) => {
    
    const loadingStyle = (loading) => {
        return loading ? { opacity: 1 } : { opacity: 0 }
    }

    return (
        <SpinnerImg
        className={[classes.Wrapper,props.className].join(' ')}
        title="spinner" 
        style={loadingStyle(props.loading)} />
    )
}

export default Spinner