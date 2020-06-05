# Envoy - Client

This application allows users to post messages and images to a discussion board
so they can share their content and interact with other posts from other users.

## Important Links

-[Envoy Express Api Repo](https://github.com/The-GA-Honey-Badgers/group-project-api)
-[Envoy Client](https://the-ga-honey-badgers.github.io/group-project-client/)

## Planning Story

As a group we chose to tackle the message board prompt and we decided to try
and reproduce a simplistic version of a Reddit-like message board. Once we built
a working backend API with which we could CRUD on multiple resources, we
began working on the front-ent by brainstorming the various routes and components
that needed to be built for the React app. Once we knew what components needed
to be created and rendered, we each focused on a resource and built the frontend
components to successfully CRUD on these resources.

We ran into an interesting bug when we tried to run an axios API call within a
useEffect hooks function that didn't have a dependency array. The component to
which this function belonged to was never unmounted, but sat in the background of
two bootstrap modal components which had their own respective resource crud actions.
Upon successful submission of these forms, the modals would disappear and the
original component would correctly display the new API index call which it was
making; however, this wasn't an ideal behavior as the useEffect function was
running in an infinite loop. To fix this bug we decided to include the modal
components as part of the original component making the infinite API calls so
that we could toggle some state parameters to selectively set off the API call
that was originally running on repeat.

### User Stories

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to add a post to the message board.
- As a signed in user, I would like to update my post on the message board.
- As a signed in user, I would like to delete my post on the message board.
- As a signed in user, I would like to see all my posts on the message board.
- As a signed in user, I would like to view all other users' posts on the message board.
- As a signed in user, I would like to comment on other users' posts on the message board.
- As a signed in user, I would like to edit my comment on other users' posts on the message board.
- As a signed in user, I would like to delete my comment on other users' posts on the message board.

### Technologies Used

- JavaScript
- HTML
- CSS
- CSS Sass
- ReactJS
- Ajax (Axios)
- Bootstrap

### Unsolved Problems/Future Updates

- Would like to eventually add a current news API integration with a carousel
of latest news.
- Would like to eventually add a spell check feature.
- Would like to eventually add the functionality to like posts and rank posts
based on number of likes.
- Would like to eventually allow users to add tags to posts and categorize their
posts.

#### Wireframe and ERD

- [Wireframe and ERDs ](https://docs.google.com/document/d/1Hmb44N7Wq7s_IoI2SBKiVxL6_yqVa6GaK74hpY1lx-8/edit?usp=sharing)
