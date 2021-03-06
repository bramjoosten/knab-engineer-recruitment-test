import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.module.scss'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'store/reducers'
import { watchSagas } from 'store/sagas'

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isMobile = 'ontouchstart' in document.documentElement

const composeEnhancers = (process.env.NODE_ENV === 'development') && isChrome && !isMobile ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(watchSagas)
const baseName = process.env.NODE_ENV === 'development' ? "/" : "/crypto-converter/"
const app = (
    <Provider store={store}>
        <BrowserRouter basename={baseName}>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

