import {List, Map} from 'immutable';
export const INITIAL_STATE = Map();



export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list);

}
function getWinners(vote) {
  if (!vote) return [];
  const [one, two] = vote.get('pair');
  const oneVotes = vote.getIn(['tally', one], 0);
  const twoVotes = vote.getIn(['tally', two], 0);
  if      (oneVotes > twoVotes)  return [one];
  else if (oneVotes < twoVotes)  return [two];
  else                       return [one, two];
}


export function next(state) {
  const entries = state.get('entries')
                .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
      return state.remove('vote')
                  .remove('entries')
                  .set('winner', entries.first());
  } else {
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
   });
 }
}

export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
