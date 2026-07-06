# Chapter 7 - Improving the Load Time Using Server-Side Rendering

## Main concepts

1. Benchmarking the load time of our application
2. Rendering React components on the server
3. Server-siide data fetching
4. Advanced server-side rendering

### 1. Benchmarking the load time of our application
Before we can get started improving the load time, we first must learn about the metrics to benchmark the performance of our application. The main metrics for measuring the performance of web applications are called **Core Web Vitals** and they are as follows:

- First Contentful Paint (FCP) : This measures the loading performance of an app by reporting the time until the first image or text block is rendered on the page. A good target would be get this metric below 1.8seconds.

- Largest Contentful Paint (LCP) : This measures the loading performance of an app by reporting the time until the largest image or text block is visible within the viewport. A good target woould be to get this metric below 2.5 seconds.

- Total Blocking Time (TBT) : This measures the interactivity of an app by reporting the time between the FCP and a user being able to interact with the page. A good target would be to get this metric below 200 milliseconds.

- Cumulative Layout Shift (CLS) : This measures the visual stability of an app by reporting unexpected movement on the page during loading, such as a link first being loaded on the top of the page, but then getting pushed further down to the bottom when other elements load. While this metric to consider, as it can lead to annoying the users when they attempt to click on something, but the layout shifts.

All these metrics can be measured by using the open-source **Lighthouse** tool, which is also availabel from the Google Chrome DevTools under the Lighthouse panel. 