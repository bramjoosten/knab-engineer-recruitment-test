import { runSaga } from 'redux-saga'
import * as actions from 'store/actions'
import * as sagas from './sagas'
import axios from 'axios'
import {fiatMockResponse,cryptoMockResponse} from 'test/mockResponses'

jest.mock('axios');

describe('Fetch', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should successfuly run Crypto fetch method', async () => {
        
        axios.get.mockResolvedValue(cryptoMockResponse);
        const initialAction = { value: "BTC" };
        const dispatched = await recordSaga(
            sagas.fetchCryptoSaga,
            initialAction
        );
            
        expect(axios.get).toHaveBeenCalledWith("https://bramjoosten.nl/crypto-converter/proxy/?path=/v1/cryptocurrency/quotes/latest&symbol=BTC");
        expect(dispatched).toContainEqual(actions.fetchCryptoSuccess(cryptoMockResponse.data));
    });

    it('should successfuly run Fiat fetch method', async () => {
        
        axios.get.mockResolvedValue(fiatMockResponse);
        const dispatched = await recordSaga(
            sagas.fetchFiatSaga
        );
            
        expect(axios.get).toHaveBeenCalledWith("https://api.exchangeratesapi.io/latest?symbols=EUR,GBP,BRL,AUD&base=USD");
        expect(dispatched).toContainEqual(actions.fetchFiatSuccess(fiatMockResponse.data));
    });


})


export async function recordSaga(saga, initialAction) {
    const dispatched = [];

    await runSaga(
        {
            dispatch: (action) => dispatched.push(action)
        },
        saga,
        initialAction
    ).done;

    return dispatched;
}