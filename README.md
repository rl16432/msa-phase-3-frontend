# PokeTeam front-end

Link: [https://msa-phase-3-frontend.vercel.app/](https://msa-phase-3-frontend.vercel.app/)

A frontend for the PokeTeam API. The app allows users to create a team of Pokemon of their choice, and view the teams of other trainers

## Getting started

### Starting application
1. Run `npm install` to install packages
2. Start the backend according to [here](https://github.com/rl16432/msa-phase-3-backend/blob/main/README.md)
3. Add `.env.local` file to root directory with the following contents
  
    `NEXT_PUBLIC_POKETEAM_API_BASE_URI="https://localhost:7246"`
  
    `https://localhost:7246` may be different depending on the URL of the backend
4. Run `npm run dev` to start in development mode 

### Starting Storybook
1. Perform the steps in **Starting application**
2. Run `npm run storybook` to start

## Advanced Feature 1: Connection to own hosted API

The API from the backend is hosted on Azure API Management. Services are defined which call the API in this [file](https://github.com/rl16432/msa-phase-3-frontend/blob/main/services/UserServices.ts). Vercel takes the API endpoint as an environment variable to connect to the production API

## Advanced Feature 2: UI Scalability

UI scalability was used to achieve responsive design, so that the application functions across all sizes of devices. This was implemented in some cases, using the display prop for MUI. By specifying {xs: "none", md: "flex"} or {xs: "flex", xs: "none"}, conditional display can be achieved and display according to the breakpoints

![image](https://user-images.githubusercontent.com/65014987/192090606-129ce7f6-d915-4a55-8731-0b0f55034308.png)

### Mobile

![image](https://user-images.githubusercontent.com/65014987/192090707-8e658eb5-f58e-4eaf-9dd7-1243038786c2.png)

### Desktop

![image](https://user-images.githubusercontent.com/65014987/192090727-fd513321-8184-4e43-93a3-f1b8a4765b1b.png)

## Advanced Feature 3: Mobile-first development

Mobile web browsers generally have more limitations than on desktop, so it is reasonable to develop features for mobile first, and then scale up features for desktop applications. Mobile first development was utilised in many ways across the frontend development, including the navigation bar and the [PokemonCard.tsx](https://github.com/rl16432/msa-phase-3-frontend/blob/main/components/PokemonCard.tsx) component

### Example

Accordion component is used on smaller screens (Lower than 'md' breakpoint) to display the Pokemon stats in [PokemonCard.tsx](https://github.com/rl16432/msa-phase-3-frontend/blob/main/components/PokemonCard.tsx)

![image](https://user-images.githubusercontent.com/65014987/192090839-d3c205e2-5a43-426a-a8be-2517c547f92a.png)

Stats are displayed on the card whenever the mouse hovers over in larger screens (Greater than 'md' breakpoint)

![image](https://user-images.githubusercontent.com/65014987/192090904-c888754c-ad3b-458b-9b4f-c3e070683cb0.png)

## Advanced Feature 4: Redux

Redux store was used to track logged-in users across the pages, so that the user is not signed out every time they switch pages. A Redux slice was created for the logged-in user details in [loginSlice.tsx](https://github.com/rl16432/msa-phase-3-frontend/blob/main/components/Login/loginSlice.tsx)

- State
  - userTeam – Tracks logged-in user details
- Reducer
  - setUserTeam – Sets ‘userTeam’ state to action payload
- Action Creator
  - Generates an action with a payload that can be dispatched to call the reducer
  - loginSlice.action
  
The Redux [store](https://github.com/rl16432/msa-phase-3-frontend/blob/main/store/UserStore.ts) is provided to the application through the `Provider` component. On the initial render, the store loads from local storage through `store.dispatch(setUserTeam(loadState()?.userTeam));`. Every time an action is dispatched, the `saveState(store.getState().login);` is called which saves the serialized login details to the store.

![image](https://user-images.githubusercontent.com/65014987/192091173-2a157e23-8dc8-40f4-bb0c-874408c42c6d.png)

## Advanced Feature 5: Storybook

Storybook was used to create a library of the major components in the application.

### Actions
- Records events from the components
- Although not the most effective way, a Storybook action is defined in each event handler, to record the important actions

  ```typescript
  const onLogin = (e: MouseEvent) => {
    // Storybook purposes
    action("attemptLogin")(e);
    // ...
  ```

The below shows a list of actions recorded on the [Login](https://github.com/rl16432/msa-phase-3-frontend/blob/main/stories/Login.stories.tsx) component story

![image](https://user-images.githubusercontent.com/65014987/192091383-a5884404-e681-49a8-a668-d395a9175e84.png)

### Interactions
- Sometimes didn’t work well sometimes because of React rendering. I figured out that after the project deadline that `waitFor` can be used in order to wait for the rendering to occur, and retry the query after the DOM has re-rendered. Since React takes time to update state and re-render, the interactions cannot be done immediately one after the other without 'waitFor'

![image](https://user-images.githubusercontent.com/65014987/192091700-84c95866-7387-4785-88ec-7d15cf9fcbe9.png)

*Example of Storybook Interactions use*

## Advanced Feature 6 (attempted): Interaction/Unit Testing
Interaction testing was also done to a small degree. Due to the issues with React rendering, the test cases would occasionally run before the elements which are required for the test to pass, are able to render in the DOM

This was often resolvable using `waitFor`, which retries the test or userEvent until there is a pass or a time-out:

[PokemonCard.stories.tsx](https://github.com/rl16432/msa-phase-3-frontend/blob/main/stories/PokemonCard.stories.tsx) (note that the below implementation with `waitFor` does not exist in the file due to the project deadline)

```typescript
Mobile.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => userEvent.click(canvas.getByTestId("expand")));

  // Stats are shown
  await waitFor(() => expect(canvas.getByText(/.*Speed.*/i)).toBeVisible());

  await waitFor(() => userEvent.click(canvas.getByTestId("expand")));

  // Stats are hidden
  await waitFor(() => expect(canvas.getByText(/.*Speed.*/i)).not.toBeVisible());
};
```

This test tests if the 'Speed' stat (and consequently other stats) are correctly displayed on the screen when the accordion is clicked once, and not displayed on the screen when the accordion is clicked for a second time.

![image](https://user-images.githubusercontent.com/65014987/192092057-4dcc426d-f6b1-45e2-b10f-a56097abf444.png)
