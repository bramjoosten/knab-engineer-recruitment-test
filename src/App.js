import React, { useRef } from 'react'
import classes from 'App.module.scss'
import { connect } from 'react-redux'

import Results from 'components/Results/Results'
import Form from 'components/Form/Form'
import { ReactComponent as LogoImg } from 'assets/logo.svg'
import BackgroundImg from 'assets/bg.jpg'

const App = props => {

  let results = <Results />
  const initBgHeight = useRef(window.screen.height)
  if (props.error) {
    results = (<p className={classes.ErrorMessage}>Oops, code not recognized. Please try again.</p>)
  }



  console.log(initBgHeight)


  return (
    <>
      <div className={classes.Background}>
        <img className={classes.BgImg} style={{ "height": initBgHeight.current }} src={BackgroundImg} alt="background" />
      </div>
      <div className={classes.Wrapper}>
        <LogoImg
          className={classes.Logo}
          title="logo" />
        <Form />
        {results}
      </div>
    </>
  );

}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}


export default connect(mapStateToProps)(App)