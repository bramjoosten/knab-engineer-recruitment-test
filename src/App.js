import React from 'react'
import classes from 'App.module.scss'

import Results from 'components/Results/Results'
import Form from 'components/Form/Form'

const App = props => {
  // console.log("[App]")
 

  return (
    <div className={classes.App}>
      {console.log("[render]")}
      {/* <p>{errorMessage}</p> */}
      <Form />
      <br />
      <Results/>
    </div>
  );

}




export default App