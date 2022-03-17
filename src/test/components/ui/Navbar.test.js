import { mount } from "enzyme";
import { Navbar } from "../../../components/ui/Navbar";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "../../../auth/authContext";
import { types } from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('tests in <NavBar />', () => { 

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pedro',
            logged: true
        }
    }
    
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path="/" element={ <Navbar /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    ); 

    test('should show component correctly', () => { 
       
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Pedro');

        //Snapshot

        // .text-info = ... Pedro
     })

     test('should call logout, call navigat and the dispatch with the arguments', () => { 

        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith( {'type': types.logout});
        expect( mockNavigate ).toHaveBeenCalledWith('/login', { replace: true });

      })
 })