// Name reducer and action generators
// ----------------------------------

export var nameReducer = function (state = 'Anonymous', action) {
  switch (action.type) {

    case 'CHANGE_NAME':
      return action.name;

    default:
      return state;
  }
};

// Hobby reducer and action generators
// ----------------------------------

var hobbyId = 1;
export var hobbyReducer = function (state = [], action) {

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

// Movie reducer and action generators
// ----------------------------------

var movieId = 1;
export var movieReducer = function (state =[], action) {
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

// Map reducer and action generators
// ----------------------------------

export var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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
