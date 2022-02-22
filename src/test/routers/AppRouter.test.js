import { mount } from 'enzyme';

import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Tests in <AppRouter />', () => { 

    const contextValue = {
        user: {
            logged: false
        }
    }

    test('should show login screen if user is not authenticated', () => { 

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login Screen' );
        
     });



 })