import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

//Before we're done with the server, let's have it load up
// a set of test entries for us to play with, so that we have
//something to look at once we have the whole system going.
//We can add an entries.json file that lists the contest entries.
//For example, the list of Danny Boyle's feature films to date - feel
// free to substitute your favorite subject matter though!

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type:'NEXT'});
