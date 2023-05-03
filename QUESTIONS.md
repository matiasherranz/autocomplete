# Part 2: Questions

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

This takes me back to the Class component and life-cycle methods days!

The difference mainly resides, if I recall correctly, in the way they decide if a re-render is needed, based on props/state (they used different approaches to decide if the re-render was needed). `PureComponent` gave a performance improvement in some cases.

The case where it may cause undesired behavior is, I believe, if the data from props/states was complex or deeply nested and two objects / state representations would be considered equal although being different at a deeper levels.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

This was the one! `ShouldComponentUpdate`! I remember using it once, a million years ago, to embed a Google Maps UI piece, making it always return `false` (as in "my component should never update, Google Maps iframe does all the magic internally").

Back to the point: This relates to the previous question: deeper equality check / more shallow object equality check causing false positives (considering objects to be equal by shallow checking them).

## 3. Describe 3 ways to pass information from a component to its PARENT.

Passing data from a child component to a component higher on the hierarchy can be done in one of this ways:

- Pass a function as prop, that take a parameter, from the parent to the child. Then the child can call this function and the parent can make use of the value passed to the callback,
- The child component can update a piece of Redux state that the parent also observes,
- Extreme one, but seen it happen:
  - The parent component polls an API for values periodically,
  - The children sends some data to the API,
  - On the next polling interval, the parent gets the data sent from the children.

## 4. Give 2 ways to prevent components from re-rendering.

- Using `useCallback` to wrap a function definition inside a parent component before passing it to a children component. Functions are re-defined on every re-render, so the function instance (typically held in a `const`) will actually be a different one, even though the function definition didn't change at all, and this will then cause the child component that received this `const` to unnecessarily re-render,
- Along the same lines, `useEffect` can be very effective to control which pieces of data are worth re-rendering for. This can be controlled using the dependency array,

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are a way that React provides to group and return multiple elements from a React component without adding any DOM nodes (as you would if you used a `div`, for instance). A thing I like about Fragments is how minimal / non-verbose the code looks with them (`<>...</>` instead of `<div>...</div>`).

It will break if you try to add props or style them.

## 6. Give 3 examples of the HOC pattern.

1. To ensure a common auth layer for pages ("pages" as in "nextjs pages"): you can define your component assuming there will be a user instance / token or whatever makes sense to you present in the props you receive. Then you wrap the page component and handle the checks for auth and redirection to login page if there's not.

2. To keep presentational components.. _presentational_ :-) . With a somewhat similar mindset to the previous point, you can make sure to get (from either an actual API or local cache) some piece of data you use in several parts of the application and wrap the presentational component with it, making it a fair assumption inside the component for the data to be there.

3. Error boundaries! You can use this HOC component taxonomy to set a boundary for the error propagation.

4. BONUS: React Context! You can use HOCs to share pieces of state between components to avoid prop drilling.

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

Between `.then()` (old style) promises and `async / await` promise manipulation, I'd say it is mostly syntax sugar, as there's no de real semantic differences AFAIK.
With the old style promises, you have the `.catch()` method that gets called if the promise gets rejected / errors.
With `async / await` you need to wrap the async call with a `try / catch` block.

PS: While working on the code challenge, I ended up thinking about promise rejection and correct API error handling in TS, and I ran into this neat article from Ken Dodds that I took inspiration from and that I'd like to share, as I found it to be very interesting:
https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

## 8. How many arguments does setState take and why is it async.

I started answering thinking about functional components, had to go back for a second!

It takes 2 arguments: the new value and an optional callback with, I believe `oldState` as parameter, that should return the mutated state.
It is async for performance optimization. ReactJS executes all setStates asynchronously to avoid multiple updates to block each other.

## 9. List the steps needed to migrate a Class to Function Component.

Well, this is a likely more-opinionated-than-usual answer, but let's try to outline the steps here:
(Note: I'll assume we'll be using TS)

- Identify the parameters (props) the component receives and model it,
- Create a new functional component, that takes the props we just typed,
- Identify which pieces of state we will be baking into the component and model the state pieces with `useState`,
- Identify the pieces of data and async / API calls the component needs to make, and model them with custom hooks. They should return the usual data: `isLoading`, `error`, `data`, and, if necessary, a callback to perform another query,
- Identify the pieces of code that can live outside the component (like text or data manipulation, unit conversion, text formatting, etc.) and move them to a separate file,
- Now go over the life cycle methods and bring them to our FC using `useEffect`,
- Be mindful about costly calculations that can be memoized and wrap them with `useMemo`,
- Try to spot functions that should be wrapped in `useCallback` to avoid unnecessary re-renders, particularly when those functions are passed to child components as parameters,
- With all these pieces in place, add a `return` statement and move the presentational pieces to the new component,
- Time to test and make sure the UI / UX is at least preserved if not improved,
- Move the tests to cover the updated component. Write some tests if you didn't have any, this is a great time to do so, as you'll be very immersed into the inner workings of the component!

## 10. List a few ways styles can be used with components.

- Style libraries (like Tailwind),
- CSS / SCSS classes,
- Inline styles,
- CSS in JS (Emotion, styled-components, etc.),
- CSS Modules.

Extra / Noteworthy: another way to get "components with styles", as a more general concept, is using a component library, like MaterialUI or DaisyUI.

## 11. How to render an HTML string coming from the server.

If it comes from a server-side-rendering (SSR), with React.render.
For the more general case, I try to steer clear from `dangerouslySetInnerHTML` and use a library, like `react-html-parse` (almost sure this was the name of the library!) and its `parse` method.
