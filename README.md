README

Link to live site [MeetaGroup](https://meetagroup.herokuapp.com/)

## Introduction of MeetaGroup

MeetaGroup is a clone of [Meetup](https://www.meetup.com/), it has most of Meetup's functionality. For example, it allows users to create their own groups,
update their groups, as well as deleting the groups. All of the users can explore and search different groups and events. After logging in or signing up,
they can request to join any group they are interested in. After joining the group, they can request to attend or change their RSVP for a specific event
that is related to the group they joined.


## Tech Stack

Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database:

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

Hosting:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
## Usage descriptions of features


### Homepage

<img src="./recording/home-page.gif" alt="homepage recording" height="500">

### Login modal

<img src="./recording/login-page.gif" alt="login recording" height="500">

### All groups and group details

<img src="./recording/group-page.gif" alt="group details recording" height="500" >

### All events and event details

<img src="./recording/event-page.gif" alt="event details recording" height="500" >

### Searching page

<img src="./recording/search.gif" alt="searching page recording" height="500" >

### Join and Leave a group

<img src="./recording/join-group.gif" alt="joining group recording" height="500" >

<!-- code block -->


## Run locally

Here is the get started section with instruction on how to set up the repo ro run the project locally


### Clone the repo


### Set up Environment Variables

To run the project locally, you will need to create the .env file in the backend folder with the following environment variables.

```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=<<generate_strong_secret_here>>
JWT_EXPIRES_IN=604800
```


### Set up Database

You will need to run the following codes in the backend repository.

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

## To do list for future features

- Add Calendar on the event page

- Add Calendar for all evnets in search results

- Add Google Maps for events details

- Improve the searching algorithm

- Refactor the backend routes
# meet-a-group
# meet-a-group
# meet-a-group
# meet-a-group
# meet-a-group
