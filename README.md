# PokeTeam front-end

A frontend for the PokeTeam API. The app allows users to create a team of Pokemon of their choice, and view the teams of other trainers

## Back-end Repo
https://github.com/rl16432/poketeam-backend

## Contents
- [Getting started](#getting-started)
  - [Starting application](#starting-application)
  - [Starting Storybook](#starting-storybook)
- [Dependencies](#dependencies)
- [Demo](#demo)
  - [Adding Pokemon](#adding-pokemon)
  - [View Trainers](#view-trainers)
  - [Create Trainer Account](#create-trainer-account)
- [Deployment](#deployment)


## Getting started

### Starting application
1. Run `npm install` to install packages
2. Start the backend according to [here](https://github.com/rl16432/poketeam-backend/blob/main/README.md)
3. Add `.env.local` file to root directory with the following contents
  
    `NEXT_PUBLIC_POKETEAM_API_BASE_URI="https://localhost:7246"`
  
    `https://localhost:7246` may be different depending on the URL of the backend
4. Run `npm run dev` to start in development mode 

### Starting Storybook
1. Perform steps 1-3 in **Starting application**
2. Run `npm run storybook` to start

## Dependencies

Dependencies can be viewed [here](https://github.com/rl16432/poketeam-frontend/blob/main/package.json)

## Demo

### Adding Pokemon
![Adding Pokemon](https://user-images.githubusercontent.com/65014987/216911064-59cc17ce-6a0c-47eb-a069-06aab605cd65.gif)
### View Trainers
![View Trainers](https://user-images.githubusercontent.com/65014987/216911157-482bdad1-7b2b-4ed0-a86f-620b6f3310cd.gif)
### Create Trainer Account
![Animation3](https://user-images.githubusercontent.com/65014987/216911168-52d27573-bbb2-4996-b0c2-10f2fbf3fc86.gif)

## Deployment
Link: [poketeam-hq.vercel.app](https://poketeam-hq.vercel.app)

**NOTE:** Deployment may not be functional as back-end is no longer hosted :moneybag::moneybag::moneybag:
