import {List,Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe ('application logic', () => {

    describe ('setEntries', () => {

        it('adds the entries to the sate', () => {
            const state = Map();
            const entries = List.of('Transpotting', '28 Days Later');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map ({
              entries: List.of('Transpotting', '28 Days Later')
            }));

        });

    });

    describe('next',() => {

        it ('takes the next two entries under vote',() => {
            const state = Map({
              entries: List.of('Transpotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState).to.equal (Map({
              vote: Map({
                pair: List.of('Transpotting','28 Days Later')
              }),
              entries: List.of('Sunshine')
            }));
        });


    });

    describe('vote',() => {

        it('create a tally for the voted entry', () => {
          const state = Map({
            vote: Map({
              pair: List.of('Transpotting', '28 Days Later')
            }),
            entries: List()
          });
          const nextState = vote(state, 'Transpotting');
          expect(nextState).to.equal(Map({
            vote: Map({
              pair: List.of('Transpotting', '28 Days Later'),
              tally: Map({
                'Transpotting':1
            })
          }),
          entries: List()

        }));
    });

      it('adds to existing tally for the voted entry',() => {
          const state = Map({
            vote: Map({
              pair: List.of('Transpotting', '28 Days Later'),
              tally: Map({
                'Transpotting':3,
                '28 Days Later':2
              })
            }),
            entries: List()
          });
          const nextState = vote(state, 'Transpotting');
          expect(nextState).to.equal(Map({
            vote: Map({
              pair: List.of('Transpotting','28 Days Later'),
              tally: Map({
                'Transpotting':4,
                '28 Days Later':2
              })
            }),
            entries: List()
          }));
      });
    });

});