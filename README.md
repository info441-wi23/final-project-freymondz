# INFO 441 - SyncHub

Jeffrey Qiu, Zachary Zhang, Yin Tang Pang

Our target audience are people who watch TV shows and would like to express their opinions about the show and see what other people thought about shows they watched. Our target audience would want to use our application because people like to see what other people think about something. Additionally people like to share opinions and the reviews would serve as an infomrative way for prospective viewers to see if they would be interested in the show.

As developers, we would like to build this application because this is an opportunity that we can apply our skills learned in this class to solve a real-world problem by implementing a platform that brings fans of TV shows together for an immense social expereince while enjoying their favoirte shows.

## Technical Description

### Architectural Diagram Mapping

![Architectural Diagram](https://user-images.githubusercontent.com/37636251/223833921-814aaae7-862c-4183-9ea8-a6553e4f62db.jpg)

### User Stories

| Priority | User | Description | Technical Implementation |
| ---------|------|-------------|-------------------------|
|  `P0`    | as a viewer | I want to be able to explore the shows that are recommended to me | the client would use a `GET` request to load in stored shows on `MongoDB` which the client would then display |
|  `P0`    | as a viewer | I want to be able to find a show that I am searching for | the client would use a `GET` request to the IMDB API to find the show that matches with the entered words which the client would then display them |
|  `P0`    | as a viewer | I want to be able to see other people's review's on the show | `MongoDB` would store all users' reviews. Our server would get the data from `MongoDB` when the page is loaded.
|  `P1`    | as a guest user | I want to be able to rate and review a show as a guest user| The client would call a `POST` request on the backend that then gets saved to `MongoDB`. The client would also show the rating from the frontend by calling a `GET` reqest for ratings. 
|  `P1`    | as a a registered user | I would like to create an account to post and review shows | Have a login/signup page that gets stored in `MongoDB`. We would use something like `Azure` for authentication and have sessions so users don't have to 
|  `P2`    | as a guest user | I want to be able to rate and review a show for a SPECIFIC season and episode as a guest | The client would call a `POST` request on the backend that then gets saved to `MongoBD`. The client would also show the rating from the frontend by calling a `GET` reqeust for reviews.
|  `P2`    | as a registered user | I would like to edit my profile | `MongoDB` would store users' profile information. The client would use a `GET` request ot load information and a put request to change the corresponding fields.
|  `P2`    | as a user/viewer | I would like to filter through reviews by season | When we call the backend we can sort the returned show reviews by their seasons.
|  `P2`    | as a user/viewer | I would like to filter through reviews by season and episode | When we call the backend we can sort the returned show reviews by their episodes.
|  `P2`    | as a user/viewer | I would like to sort reviews by rating | When we call the backend we can sort the returned show reviews by their ratings


### End Points

| Endpoint | HTTP Method | Purpose |
|----------|-------------|---------|
| `/signup`| `POST`      | sign up a new user and create a new account |
| `/login` | `POST`      | log in in existin guser and retrieve a unique authentication token |
| `/shows` | `GET`       | get all shows stored in the MongoDB if the keyword is empty |
| `/shows` | `POST`      | when user posts a review for the show, the endpoint checks to see if the show is already in the show schema if it is not then it adds the show to the database |
| `/shows/{showId}` |  `GET` | retrieve information about a specfic tv show including reviews |
| `/shows/explore/{showId}` |  `GET` | retrieve tv shows that contain the user input keyword using external API |
| `/shows/find/{showId}` |  `GET` | retrieve a specific show's information using external API |
| `/reviews/{showId}`| `GET` | retrieve the user reviews of a specific show |
| `/reviews/{showId}`| `POST` | post the user review for the specific show |

### Schema:

#### User Collection

```js
{
  _id: ObjectId(),
  username: String,
  name: String,
  picture: String,
}
```

#### Shows Collection

```js
{
  _id: ObjectId(),
  showId: String,
  title: String,
  img: String
}
```

#### Reviews Collection

```js
{
  _id: ObjectId(),
  showId: String,
  username: String,
  review: String,
  rating: Number,
  season: Number,
  eposide: Number
}
```
