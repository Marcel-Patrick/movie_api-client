# movie_api-client

## This is my Movie Application (Client-Sinde Part)

### Objective:

---

**Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).**

### Technical Requirements:

### Required:

---

- The application must be a single-page application (SPA)
- The application must use state routing to navigate between views and share URLs
- The application must give users the option to filter movies
- The application must give users the option to sort movies
- The application must initially use Parcel as its build tool
- The application must be written using the React library and in ES2015+
- The application must be written with React Redux (hence respecting the Flux pattern)
- The application must use Bootstrap as a UI library for styling and responsiveness
- The application must contain a mix of class components and function components
- The application may be hosted online

### Design Criteria:

#### User Stories:

---

- As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

#### Features & Requirements:

---

The feature requirements below were extracted from the user stories listed above. Your project will only be approved if the following “essential” feature requirements are implemented in your Achievement project.

#### Essential Views and Features:

---

Main view:

- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

Single movie view:

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view:

- Allows users to log in with a username and password

Registration view:

- Allows new users to register (username, password, email, birthday)

Genre view:

- Returns data about a genre, with a name and description
- Displays example movies

Director view:

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

Profile view:

- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

#### Optional Views and Features:

---

Single movie view and all movies views:

- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date and the movie rating

Actors view:

- Allows users to view information about different actors

Profile view, single movie view, and all movies view:

- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list

### Setup:

---

1. Installing the Right Dependencies
   Dependencies are what your application needs for both development and production, while development dependencies are only necessary during development.

- In order to use Parcel in movie_api-client, you first need to install it globally:
  use `npm install -g parcel@next` command for Terminal
- Now, now navigate to “movie_api-client” project folder in terminal, then run the following commands to install packages and dependencies you need for React application development:
  use `npm install --save react react-dom` command for Terminal

- to use the actual list of movies from movie_apiDB, it´s needed to perform an ajax operation. For this, First install the Axios library:
  use `npm install axios --save` command for Terminal

- As props transmit data between components in a React application, propTypes validate the data types based on the app’s configuration. To avoid errors and bugs, install propTypes:
  use `npm install --save prop-types` command for Terminal

- A small help:
  If the images on the movie view are not getting displayed, there must be an issue with the links stored in the database.
  To fix that, add crossOrigin="anonymous" to the <img> tag, to avoid this error.

2. To Design a propper UI (User Interface)
   Half the work of a frontend developer is ensuring that the user interfaces (UIs) they code resemble the prototypes they receive from their designers as closely as possible.
   Design systems are often used by product teams to ensure consistent styling and branding across a product, creating a uniform and coherent experience for users.
   A design system is essentially a library of UI components applied to one or several products.

- For ths App we use React Bootstrap. In order to use React Bootstrap in movie_api-client, install it:
  use `npm install --save react-bootstrap` command for Terminal
