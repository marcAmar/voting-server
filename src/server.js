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
  });


}
