1. How long did you spend on the coding assignment? What would you add to your solution if you had
more time? If you didn't spend much time on the coding assignment then use this as an opportunity to explain what you would add.
I spent 2 weeks on the assignment. If I had more time, I would add autosuggest functionality, set up an e2e test and an integration test. I would also add more animations for example smooth WebGL-powered background animations with PixiJs.
2. What was the most useful feature that was added to the latest version of your language of choice? Please include a snippet of code that shows how you've used it.

The most useful feature are the generators, by using yield I'm able do both API calls in parallel.
```
export function* calculateSaga(action) {
    yield all([
        put(actions.fetchFiat()),
        put(actions.fetchCrypto(action.userInput)),
    ])
    //...
}
```

3. How would you track down a performance issue in production? Have you ever had to do this?
I usually use chrome developer tools with react/redux plugins, or webpagetest.org. Also lighthouse is a great way to audit loading issues.
For visual performance issues like framerate problems I use the performance audit tab in devtools. For loading issues I use the Network tabs, and for general pagespeed issues there's the Lighthouse audit or webpagetest.org. 9 out of 10 projects I do involve some performance optimization one way or the other
4. What was the latest technical book you have read or tech conference you have been to? What did you learn?
Last week I visited React Live conference where professionals were live coding on stage. I learnt a variety of new tools and libraries. For instance Cssstats.com for analyzing stylesheets.
5. What do you think about this technical assessment?
I really enjoyed it. I was lucky to be able to spend quite some time on it.
6. Please, describe yourself using JSON.
Please see myself.json in project root.