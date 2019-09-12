import * as actions from './actions'
import * as actionTypes from './actionTypes'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sideEffects'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates FETCH_FIAT_SUCCESS when fetching fiat currencies has been done', () => {
        const store = mockStore({ todos: [] })
        sagaMiddleware.run(sagas.watchSideEffects)

        // fetchMock.getOnce('/todos', {
        //     body: {},
        //     headers: { 'content-type': 'application/json' }
        // })
        // const text = 'Finish docs'
        const expectedActions = [
            { type: actionTypes.FETCH_START },
            { type: actionTypes.FETCH_FIAT_SUCCESS, body: {} }
        ]

        store.subscribe(() => {
            const actions = store.getActions();
            if (actions.length >= expectedActions.length) {
                expect(actions).toEqual(expectedActions);
                //   done();
            }
        });


        // return store.dispatch(actions.fetchFiat(null)).then(() => {

        //     expect(store.getActions()).toEqual(expectedActions)
        // })
        // Return the promise
        store.dispatch({ type: "FETCH_START" });
    })
})