import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";


describe('Tests for authReducer', () => { 

    test('should return default state', () => { 

        const state = authReducer( { logged: false }, {});
        expect( state ).toEqual( { logged: false });
     })

     test('should authenticate and add "name" of user', () => { 

        const action = {
            type: types.login,
            payload: {
                name: 'Fernando',
            }
        }
        const state = authReducer( { logged: false }, action );

        expect( state ).toEqual({
            logged: true,
            name: 'Fernando'
        })
      })

      test('should delete user name and leave logged as false', () => { 
        const action = {
            type: types.logout,
            };
        
            const state = authReducer({ logged: true, name: 'Fernando' }, action );
            expect( state ).toEqual({ logged: false });
       })
 })