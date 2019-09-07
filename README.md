
## Install

`npm install`

## Run Local

`npm start`

## Run tests

`npm test`

## Featured

-   React 16.x
-   Jest 24.x
-   React-Testing-library 9.x
-   Bootstrap 4.x

## Updates
- Changed Testing tools from Enzyme to React-Testing-library as it leans more towards testing user behavior and works better with react hooks.
- Adjusments for back button and image size on big screens.

## Assumptions and Notes

- Used bootstrap for base style layout.
- Used React hooks because it let you keep your functional components as functions and “hook” into React specific functionality and much simple and cleaner code.
- Not much need to use nextJS as it more for server-side rendering 
- Used Create-react-app as a start
- Used Jest, React-Testing-library for two ways of testing (snapshot testing & DOM testing) 
- Used react route Dom for routing between the two assessments
- Viewer can navigate to 2nd assessment by clicking any link/button in the 1st assessment page or type url localhost:3000/dynamicForm
- Viewer can navigate to back to 1st assessment by clicking on back button on top-right corner in the 2nd assessment page or type url localhost:3000/
- Also provided a standalone html for 1st Assessment on root folder