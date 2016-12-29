var redux = require('redux');

console.log('Starting redux example');

var actions = require('./actions/index');
var store  = require('./store/configureStore').configure();

var unsubscribe = store.subscribe(() =>{
  var state = store.getState();

  console.log('Name is', state.name);

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = "<a href='" +state.map.url+ "'target='_blank'>View Your Location</a>";
  }

});

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Hung Vo'));

store.dispatch(actions.addHobby('Runging'));

store.dispatch(actions.addHobby('Hiking'));

store.dispatch(actions.addMovie('Lan va Diep', 'tinh cam'));

store.dispatch(actions.addMovie('Y thien do long', 'kiem hiep'));

store.dispatch(actions.changeName('Ngan Mai'));

store.dispatch(actions.removeMovie(1));

store.dispatch(actions.removeHobby(1));
