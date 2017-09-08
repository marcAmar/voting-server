import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

//We are now publishing the whole state to everyone whenever any changes
// occur
  store.subscribe(
    () => io.emit('state', store.getstat().toJS())
  );

//In addition to sending a state snapshot whenever state changes,
// it will be useful for clients to immediately receive the current
// state when they connect to the application.

  io.on('connection',(socket) => {
  socket.emit('state', store.getState().toJS());
//In addition to emitting the application state out to clients,
//we should also be able to receive updates from them: Voters will
// be assigning votes, and the vote organizer will be moving the contest
// forward using the NEXT action.

//The solution we'll use for this is actually quite simple.
// What we can do is simply have our clients emit 'action' events//
// that we feed directly into our Redux store:
  socket.on('action', store.dispatch.bind(store));

  });


}
