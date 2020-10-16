# Team 18 - Spotlight

- [Team 18 - Spotlight](#team-18---spotlight)
  - [Product Details](#product-details)
    - [Q1: What we are planning to build](#q1-what-we-are-planning-to-build)
    - [Q2: Target users](#q2-target-users)
    - [Q3: Why users would chose our project over what they're currently using](#q3-why-users-would-chose-our-project-over-what-theyre-currently-using)
    - [Q4: How we will build our project](#q4-how-we-will-build-our-project)
    - [Q5: MVP user stories](#q5-mvp-user-stories)
  - [Process Details](#process-details)
    - [Q6: Team roles and responsbilities](#q6-team-roles-and-responsbilities)
    - [Q7: Team operational events](#q7-team-operational-events)
    - [Q8: Self-organization](#q8-self-organization)
    - [Q9: Team rules](#q9-team-rules)
  - [Highlights](#highlights)

## Product Details

### Q1: What we are planning to build

 We are building a mobile app which will be a social and planning tool for people who frequently go to the gym. There is a lack of networking platforms for people who wish to socialize and find gym partners, as well as a centralized source of gym information. Some users would like to connect with people with similar workout routines and schedules, and others prefer to workout in less crowded gyms. We want to provide a single platform for all gym goers that will provide all the information and tools they need to get the best gym experience.

The app will show nearby gyms, it’s occupancy and the profiles of others in the gym. These profiles can show information such as their age range, gender and nickname. Additionally, users can send a friend request and view more information, such as exercise schedules. Friends can send messages with each other and coordinate workouts. There will be a calendar tool to help users organize and plan future workouts that the user can choose to share with their friends or to the public. 

**Figma mock-up link: <https://www.figma.com/file/3xShdaso96Wwk0SGlGzKpj/Spotlight-App?node-id=0%3A1>**

### Q2: Target users

* Noah, a highschool student planning to fulfill his new year’s resolution, can use the Spotlight app to find new friends and workout buddies that can help him motivate himself to frequent the gym more often.
* Chadwick, an experienced gym member and bodybuilder, who wishes to find partners and form competitive relationships to continually challenge and push himself even further can use Spotlight to find like-minded people.
* Abby, an accountant for a large firm who enjoys keeping track of her statistics and planning ahead, can use Spotlight to track and schedule her yoga exercises.
* Manny, a whitecollar office worker with 3 kids who exercises for alone time, can use Spotlight to help find less busy gyms or least busy hours of his favorite gym.
* Stephanie, a housewife who recently was encouraged by her friends to exercise more, wants to share her schedules and routines with her friends. She can do so easily with spotlight.

### Q3: Why users would chose our project over what they're currently using

Spotlight’s main feature is its social feature, which allows users to discover gym partners and form connections, which will be perfect for users who wish to network more in the gym.  This is useful for experienced gym goers and beginners alike; as both can gain a lot from being with a gym partner. Furthermore, users can also see the demographic and business of different gyms, enabling them to go to the gym that suits their needs the best. Additionally, Spotlight provides a calendar feature that helps people schedule and track their workouts.

There are other similar apps for different domains, such as Strava. However, there is no application in the market that shares the same feature set Spotlight will have. With this app, we hope that we fulfill our partner’s mission to provide a platform for more human connections in the gym.

### Q4: How we will build our project

Our tech stack will use React Native (Javascript, HTML, CSS) for the front end. For our backend, we’ll be using a NodeJS and Express server, which will connect our front end to a Firebase database. For CI/CD, we’re considering GitHub Actions or CircleCI to run tests on our code before integration and deployment.

Since we plan to include features in our application that make it similar to a social media app, we plan on allowing users to connect their social media accounts to the app. We’ll be using OAuth in order to keep their information secure. Other API implementations will be discussed later.

### Q5: MVP user stories

* As a new gym-goer, I want to find people who go to my gym and add them as friends in order to have somebody to go to the gym with.
  * When I click on my gym location on the map, I should be able to see a list of app-users who also go to this gym and have the option to friend them.
  * I should be able to personalize my profile so that it contains information specific to me (ie. my age range, my gender)
  * I should be able to view the profiles of other app users
* As an experienced ~lunk~ gym-goer, I want to filter users of this app by strength level in order to find a gym partner.
  * When I look at the list of people who go to my gym, I should be able to filter them by 1-rep maxes on their major lifts.
* As an avid gym goer who already has a circle of friends that enjoy fitness as well, I want us to be able to share our workout information in order to motivate each other.
  * When I access the app, I should be able to list what lifts at what weights I did during my workout, and people on my friends list should be able to see this record if I chose to share it.
* As somebody who is worried about the current pandemic, I want to find the least busy hours to go to the gym in order to not die of covid.
  * When I click on a gym, I should be able to see how busy that gym is (even better if I am able to tell which hours it’s most vacant).
* As someone who is looking for a relationship, I would like to use the app in order to meet people with a common interest (fitness) and be able to communicate with them.
  * When I search for users, I should be able to view information about them that would be relevant to whether I would be compatible with them (ie. gender, age range)
  * I should be able to add other users as friends in order to establish a connection with them.
  * When I use the app’s map and select a gym, I should be able to view the people (as well as the demographics of people) who are currently using that gym.

----

## Process Details

### Q6: Team roles and responsbilities

* **Alan**
  * Role: Frontend Developer, UI & UX designer
  * Strengths: React, ReactNative, css/html
  * Weaknesses: backend, database, CI/CD
* **Jennifer**
  * Role: Frontend Lead, Prototyping Expert
  * Strengths: Figma, HTML/CSS, ReactNative
  * Weaknesses: Database design, CI/CD, Backend
* **Olivia**
  * Role: Frontend Developer, UI & UX Researcher
  * Strengths: React, Java, C
  * Weaknesses: Database, CI/CD, Node
* **Patrick**
  * Role: Full Stack (Mostly focused on backend) Developer, Project Leader
  * Strengths: Node js, Express, Database
  * Weaknesses: CI/CD, Figma
* **Samuel**
  * Role: Backend Developer, Database architecture designer 
  * Strengths: Python, JavaScript, Databases
  * Weaknesses: CI/CD, deployment, CSS designing
* **Zenghao**
  * Role: Backend, Server/Database Developer, React consultant, Meeting Minutes
  * Strengths: Python, React, CI/CD
  * Weaknesses: CSS, design, prototyping

### Q7: Team operational events

* Quick weekly sync meetings online will be held every Friday at 5:30 on Discord.
* We will talk about our progress in comparison to our task on our kanban board. After that, we will re-adjust our goals to make sure that it aligns with our deadline and our expectations. Also, we will discuss what went well and what went wrong in our sprints and readjust our strategy for the next sprint.
* Other events could be coding sessions and code reviews will be discussed and done per individual pairing.
* **Meeting #1:** October 9th
  * What the app entails
  * What he envisioned the app would look like
  * We also wanted to focus on a few of the functionalities of the app out of many that he mentioned to ensure that at least we have a couple features that are working perfectly, rather than all the features, poorly implemented with bugs.
  * Towards the end, the partner gave us an existing demo app for Spotlight and sketches for the app design.
  * [Meeting Minutes](https://docs.google.com/document/d/1eyVfCaNgtMn6qbNeYLDKivBThJea4uwmGyjpDjiny_o/edit?usp=sharing)
* **Meeting #2:** October 13th
  * Established a regular meeting schedule of every Friday at 5:30 PM.
  * [Meeting Minutes](https://docs.google.com/document/d/1HEbP2X4tcSZywUGquSJjCKPpeS_NURHpcxqjMs4-BMo/edit?usp=sharing)

### Q8: Self-organization

We will be using Trello and ToDoist to keep track of which tasks need to be done, which ones are in progress (and who’s working on them), as well as the tasks that have been created. After meeting with our partner, we’ve decided on which features are most crucial to the product and would make up the minimum deployable application. Using this information, we will be able to plan out our sprints so that the most important elements of the app are developed first.

Our meeting minutes will also help us as we move along this process, since we’ll all be kept up to date on how tasks are divided (this will also be decided by our roles which separate us into smaller subteams) and how the next steps of our plan will look.

### Q9: Team rules

Describe your team's working culture.
**Communications**:

* The team is expected to attend weekly meetings to discuss and report the work they have done and any obstacles they might have encountered along the way
* Messenger will be the communication tool of choice for more short and frequent discussions/updates, and to plan emergency meetings should there be a need for one.
* We will communicate with the partner using Whatsapp, and Zoom to have online face-to-face meetings. Early prototypes and media can either be sent through email or by DropBox.
  
**Meetings**:

* We operate on a basis of trust. We are familiar with one another, and we believe that none of us will skip out on meetings without a valid reason.
* If a team member cannot attend a meeting, it is their responsibility to let us know as soon as possible, and the meeting will most likely be rescheduled to fit everyone’s schedule. If that is not possible, then the group leader will send a summary of the points discussed in Messenger.
* In the event that one of our team members is unresponsive, or isn’t communicating properly in the group, the group leader will let them know in private. If that doesn’t help, we will contact our project TA or David.

**Conflict Resolution:**

* Tasks not completed on time:
* Discuss with the team member who is in charge of the task about why it is taking too long to get done. Other team members can help to resolve the issue they are having trouble with. Or, have shorter checkup sessions to see where everyone is at.
* Non-responsive team member:
  * Try all different means of communication (Messenger, texting, email) to reach the team member. We plan our meetings when everyone is free, so we can discuss this being an issue with them at a meeting. If it’s impossible to reach them, we’ll have to bring the issue up with a TA to decide what happens next.
* Conflict in implementation:
  * Listen to both sides and consider pros and cons for both ideas. Have a vote with all of the team members and go by the majority.

----
## Highlights

* We had to decide between using Flutter and React Native for the front-end framework.
  * Our partner initially wanted to use Flutter, but we ended up deciding on React Native because:
      1. We’re more familiar with it, resulting in faster development and less of a learning curve
      2. The demo app our partner showed us is also written in React Native.
      3. Flutter is relatively a new framework so it will not have as much as support than React Native when we face bugs.

* We were able get the partner’s vision for the app’s features, and after discussing between ourselves and with him we were able to decide on a version of that would be feasible in the time that we have.
  * The most crucial parts of the app are user profiles, a gym map and a workout calendar.
* We are going to rebuild the product, and use the previous project as a foundation.
  * We decided that the previous product’s frontend was not up to standards, and so we decided to overhaul the frontend. The backend may still prove to be useful, so we decided to use that as the groundwork for our backend.

