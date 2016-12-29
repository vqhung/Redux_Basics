var axios = require('axios');

// Actions for nameReducer
//---------------------

export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};

// Actions for hobbyreducer
//----------------------

export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  };
};

export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

// Actions for moviereducer
//---------------------

export var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};

// Actions for mapReducer
//----------------------

export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCHING'
  };
};

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCHING',
    url
  };
};

export var fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then((res) => {
      var loc = res.data.loc;
      var baseUrl = 'http://maps.google.com?q='

      dispatch(completeLocationFetch(baseUrl+loc));
    });
  }
};
