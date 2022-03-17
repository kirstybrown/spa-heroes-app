import { LoginScreen } from "../../../components/login/LoginScreen"
import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "../../../auth/authContext";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('tests in <LoginScreen />', () => { 

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    ); 

    test('should match snapshot', () => { 
        
        expect( wrapper ).toMatchSnapshot();
     })

    test('should perform the dispatch and the navigate', () => { 

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: 'Kirsty'}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', { replace: true });

        localStorage.setItem('lastPath', '/dc');

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });
     })
 })