# INFO 441 - SyncHub

Jeffrey Qiu, Zachary Zhang, Yin Tang Pang

Our target audience are people who watch TV shows and would like to express their opinions about the show and see what other people thought about shows they watched. Our target audience would want to use our application because people like to see what other people think about something. Additionally people like to share opinions and the reviews would serve as an infomrative way for prospective viewers to see if they would be interested in the show.

As developers, we would like to build this application because this is an opportunity that we can apply our skills learned in this class to solve a real-world problem by implementing a platform that brings fans of TV shows together for an immense social expereince while enjoying their favoirte shows.

## Technical Description

### Architectural Diagram Mapping

![Architectural Diagram](https://user-images.githubusercontent.com/37636251/217921328-6879213d-d53a-4a00-8b8f-72c13958e4dd.jpg)

### User Stories

| Priority | User | Description | Technical Implementation |
| ---------|------|-------------|-------------------------|
|  `P0`    | as a viewer | I want to see all the available shows | the client would use a `GET` request to load in stored shows on `MongoDB` which the client would then display |
|  `P0`    | as a viewer | I want to be able to rate a show | The client would call a `POST` request on the backend that then gets saved to `MongoDB`. The client would also show the rating from the frontend by calling a `GET` reqest for ratings.
|  `P0`    | as a viewer | I want to be able to see other people's review's on a show | `MongoDB` would store all users' reviews. Our server would get the data from `MongoDB` when the page is loaded.
|  `P1`    | as a viewer | I want to be able to rate a show and specify which episode the rating is for | The client would call a `POST` request on the backend that then gets saved to `MongoBD`. The client would also show the rating from the frontend by calling a `GET` reqeust for reviews.
|  `P1`    | as a viewer | I want to be able to make a review for a show | The client would call a `POST` request on the backend that then gets saved to `MongoDB`. The client would also show the review from the frontend by calling a `GET` request for reviews.
|  `P2`    | as a viewer | I want to be able to make a review on a show and specify which episode the review is for | The client would call a `POST` request on the backend that then gets saved to the `MongoDB`. The client would also show the review from the frontend by calling a `GET` request for reviews.
|  `P2`    | as a viewer | I would like to create an account to post and review shows | Have a login/signup page that gets stored in `MongoDB`. We would use something like `Azure` for authentication and have sessions so users don't have to 
|  `P2`    | as a registered user | I would like to edit my profile(upload a picture, update my name, etc.) | `MongoDB` would store users' profile information. The client would use a `GET` request ot load information and a put request to change the corresponding fields.
|  `P2`    | as a user/viewer | I would like to filter through reviews by season | When we call the backend we can sort the returned show reviews by their seasons.
|  `P2`    | as a user/viewer | I would like to filter through reviews by episode | When we call the backend we can sort the returned show reviews by their episodes.
|  `P2`    | as a user/viewer | I would like to sort reviews by rating | When we call the backend we can sort the returned show reviews by their ratings

### End Points

| Endpoint | HTTP Method | Purpose |
|----------|-------------|---------|
| `/signup`| `POST`      | sign up a new user and create a new account |
| `/login` | `POST`      | log in in existin guser and retrieve a unique authentication token |
| `/shows` | `GET`       | retrieve a list of all avaliable shows |
| `/shows` | `POST`      | create a new etv show for reviewing |
| `/shows/{id}` |  `get` | retrieve information about a specfic tv show including reviews |
| `/shows/{id}/reviews`| `POST` | post a review |

### Schema:

#### User Collection

```js
{
  _id: ObjectId(),
  username: String,
  profile: {
    picture: String,
    name: String
  }
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
  userId: ObjectId(),
  showId: String,
  username: String,
  rating: Number,
  review: String,
  season: Number,
  eposide: Number
}
```
