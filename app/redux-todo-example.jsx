var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}

var reducer = (state = stateDefault, action) => {
  //  state = state || {name: 'Anonymous'};
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }

};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to change

var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('State name is: ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

var currentState = store.getState();

console.log('currentState: ',currentState);


store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'search for text'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'search for another text'
});
