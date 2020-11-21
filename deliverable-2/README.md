# Spotlight

- [Spotlight](#spotlight)
  - [Description](#description)
  - [Key Features](#key-features)
  - [Instructions](#instructions)
  - [Development requirements](#development-requirements)
  - [Deployment and Github Workflow](#deployment-and-github-workflow)
  - [License](#license)

## Description

Spotlight is a gym networking app which aims to be an all-in-one tool for gym-goers to make friends, find ideal times to go to the gym, and share workouts. One of the biggest pet peeves of people who go to the gym is when the gym is overcrowded and no equipment is available. Spotlight will show gyms in your area and help you plan your workouts to better your gym experience.

## Key Features

The development of Spotlight is divided into 5 features: Authentication, Profile, Map, Calendar, and Friends List.

Firstly, authentication systems allow users to register a new account or log in, if they already have an account. There will be a profile section for the user profile. In the map section, you can see four gyms in Toronto that users can check the status and let other users know that the user is attending the specific gym. After clicking a specific gym, the user will be able to see other users that are at the gym and the age range etc.. The user will also be able to checkout other users by using search bar on the map screen. In the calendar section, users can add workouts and name it themselves. There is a friends section where the user can see all of their friends and check out their profiles. Users should be able to add new friends by searching their name. 

## Instructions

Download the apk from our repository first.

1. Users must first register an account if they haven’t already done so. Go to sign in with email -> create account. Enter the credentials and press create account. If a user has already created an account beforehand, they can enter their credentials in the login page and login. For demo purposes, you can use the following credentials: samuelvedrik@gmail.com, password: hellospotlight
2. Once logged in, there are 4 screens that are available. Profile, map, calendar, friends. The profile screen is currently a mock of what we’re imagining the future profile screen to look like. 
3. The profile screen will display the information of the user. Includes their profile image, name, gender, age and a short description about themselves. Currently there is no data for the profile. So the user data in the profile page is hard coded.
4. The gym screen displays a map with the available gyms that are supported. Clicking on a pin creates a pop up that displays information about the gym. Once you click the pop up, you can access detailed information about that gym. Currently there is no available data yet, so the information page is blank. There is also a search bar available that we’re planning to use to find other users, as per our partner’s request. This has yet to be implemented.
5. The calendar screen displays a calendar that the user can select any date to highlight. If a date is highlighted, and “Add Workout” is pressed, the user will navigate to a screen where workout details can be added to that day’s workout (in this version, if no date is selected, users can still do this, but in the future this will not be the case). Currently, this information is not stored in a database, but users can see what it will feel like to add or remove workout information (type in details and press “Add” to add an exercise to a specific body part, press the exercise to remove it from your workout plan).
6. The friends screen displays friend requests and friends, which are listed alphabetically. Clicking on a friend will display their profile. The profiles are currently blank slates. Friend requests are currently unimplemented, and will display similarly to friends.

 ## Development requirements

Computer configuration setup:

1. Make sure that expo-cli is installed globally:

   ```bash
   npm install --global expo-cli
   ```

2. Traverse to our github page and clone the project:

    ```bash
    git clone https://github.com/csc301-fall-2020/team-project-18-spotlight
    ```

3. Install dependencies.

    ```bash
    cd team-project-18-spotlight/spotlight
    npm i
    ```

4. Start a development server with ``expo start``. Follow the instructions on the cli and/or webpage to set up the app.

5. Mobile phone configuration setup:

    - Install the expo app on your phone.

Step-by-step development process:

1. Type ``expo start`` in the terminal. A tab should open in your browser with devtools.
2. (Recommended) Using the expo app on your phone, scan the qr code in the devtools tab.

    - Note: If nothing happens for a long time, close the app instance on your phone, reopen expo, and scan the code again.
    - Expo was really buggy for us, sorry for any inconvenience.

 ## Deployment and Github Workflow

Each person creates their own branch when working on the project. When someone finishes their work. They will do a pull request and notify other members to review his/her code. After reviewing and if there is no merge conflict, other members will approve the pull request. Throughout the whole development process, we are using camelcase naming convention as we feel that it is easier to read and understand.

## License

We’ll be applying the Apache License 2.0, meaning users of our open-source code must state changes made to our codebase. We made this decision as it was restrictive enough so that the work we created would be somewhat preserved as development on the code continues.
