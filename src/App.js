import React from 'react'
import classes from 'App.module.scss'

import Results from 'components/Results/Results'
import Form from 'components/Form/Form'

const App = props => {

  return (
    <div className={classes.Wrapper}>
      {console.log("[App/render]")}
      {/* <p>{errorMessage}</p> */}
      <Form />
      <Results/>
    </div>
  );

}




export default App