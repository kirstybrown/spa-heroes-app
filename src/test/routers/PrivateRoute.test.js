import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext"
import { PrivateRoute } from "../../routers/PrivateRoute"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aquí</span>
}));

describe('Tests for <PrivateRoute />', () => { 

    Storage.prototype.setItem = jest.fn();

    test('should show component if authenticated and save in localStorage', () => { 

        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper.text().trim() ).toBe('Private Component');

        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');
     });

     test('should block component if not authenticated', () => { 

        const contextValue = {
            user: {
                logged: false            
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper.text().trim() ).toBe('Saliendo de aquí');
      })
 })