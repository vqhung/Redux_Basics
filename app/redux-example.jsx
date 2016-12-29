var redux = require('redux');

var axios = require('axios');

console.log('Starting redux example');

// Name reducer and action generators
// ----------------------------------

var nameReducer = function (state = 'Anonymous', action) {
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;

    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};

// Hobby reducer and action generators
// ----------------------------------

var hobbyId = 1;
var hobbyReducer = function (state = [], action) {

  switch (action.type) {

      case 'ADD_HOBBY':
        return [...state,
        {
          id: hobbyId++,
          hobby: action.hobby
        }
        ];

      case 'REMOVE_HOBBY':
        return state.filter(hobby => hobby.id !== action.id);
      default:
        return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  };
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

// Movie reducer and action generators
// ----------------------------------

var movieId = 1;
var movieReducer = function (state =[], action) {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [...state,{
        id: movieId++,
        title: action.title,
        genre: action.genre
      }];
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.id);
    default:
      return state;
  }
};

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};

// Map reducer and action generators
// ----------------------------------

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCHING':
      return {
          isFetching: true,
          url: undefined
      };
    case 'COMPLETE_LOCATION_FETCHING':
      return {
          isFetching: false,
          url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCHING'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCHING',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then((res) => {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl+loc));
  });

};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbyReducer,
  movies: movieReducer,
  map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();

  console.log('Name is', state.name);

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = "<a href='" +state.map.url+ "'target='_blank'>View Your Location</a>";
  }

});

fetchLocation();

store.dispatch(changeName('Hung Vo'));

store.dispatch(addHobby('Runging'));

store.dispatch(addHobby('Hiking'));

store.dispatch(addMovie('Lan va Diep', 'tinh cam'));

store.dispatch(addMovie('Y thien do long', 'kiem hiep'));

store.dispatch(changeName('Ngan Mai'));

store.dispatch(removeMovie(1));

store.dispatch(removeHobby(1));
