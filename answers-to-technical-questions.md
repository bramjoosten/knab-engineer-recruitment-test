# Answers to technical questions
1. How long did you spend on the coding assignment? What would you add to your solution if you had
more time? If you didn't spend much time on the coding assignment then use this as an opportunity to explain what you would add.

I worked on the assignment during my free time in the span of 2 weeks. If I had more time, I would add autosuggest functionality, and set up different types of tests.I would also add more animations, for example smooth WebGL-powered background animations with PixiJs. Also some components have unnecessary render cycles that I'd like to optimize.

Some things that I found challenging were setting up the php proxy, testing, and making the code work asynchronously.

2. What was the most useful feature that was added to the latest version of your language of choice? Please include a snippet of code that shows how you've used it.  

The most useful feature are function generators, by using `yield` I'm able to pause the function generator and wait for it to resolve.
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

For visual performance issues like framerate problems I use the performance audit tab in devtools. For loading issues I use the Network tabs, and for general pagespeed issues I use Lighthouse audit or webpagetest.org. Most projects I do involve resolving performance issues.

4. What was the latest technical book you have read or tech conference you have been to? What did you learn?

Last week I visited "React Live", a conference where professionals do live coding on stage. I got a feeling for the latest developments within React.

5. What do you think about this technical assessment?

I really enjoyed it. I was eager to apply knowledge I acquired recently through selfstudy. It enabled me to deep dive into certain topics.

6. Please, describe yourself using JSON.  
See myself.json in project root.