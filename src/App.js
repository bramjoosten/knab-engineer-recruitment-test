import React from 'react'
import classes from 'App.module.scss'
import { connect } from 'react-redux'

import Results from 'components/Results/Results'
import Form from 'components/Form/Form'
import Spinner from 'components/Spinner/Spinner'

const App = props => {

  let results = <Results />
  if (props.error) {
    results = (<p className={classes.Error}>{props.error}</p>)
  }

  return (
    <div className={classes.Wrapper}>
      {console.log("[App/render]")}
      <Spinner className={classes.Spinner} loading={props.loading} />
      <Form />
      {results}
    </div>
  );

}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps)(App)