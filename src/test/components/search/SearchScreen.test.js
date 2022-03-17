import { mount } from "enzyme"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchScreen } from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Tests for <SearchScreen /> component', () => { 

    test('should show correctly with default values', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim()).toBe('Please enter a hero!');
     });

    test('should show Batman and the input with the value of queryString', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );  
        expect( wrapper.find('input').prop('value')).toBe('batman');

      });

    test('should show an error if no hero found', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );  
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No results for "batman123", sorry!');

       });

    test('should call the navigate to the new screen', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );  
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        })

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');
    })

 })