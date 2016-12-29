var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}

var hobbyId = 1;
var movieId = 1;
var oldreducer = (state = stateDefault, action) => {
//  state = state || {name: 'Anonymous'};

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };

    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: hobbyId++,
            hobby: action.hobby
          }

        ]
      };

    case 'ADD_MOVIE':
        return {
          ...state,
          movies: [
            ...state.movies,
            {
              id: movieId++,
              title: action.title,
              genre: action.genre
            }
          ]
        };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter( movie => movie.id !== action.id)
      };

    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
      }

    default:
      return state;
  }

};

var nameReducer = function (state = 'Anonymous', action) {
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;

    default:
      return state;
  }
};

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
}

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
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbyReducer,
  movies: movieReducer
})

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state ', store.getState());

});



store.dispatch({
  type: 'CHANGE_NAME',
  name: 'HungVo'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Hiking'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Lan va Diep',
  genre: 'tinh cam'
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});
