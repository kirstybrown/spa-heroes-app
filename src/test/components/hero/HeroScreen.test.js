import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { HeroScreen } from "../../../components/hero/HeroScreen";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('tests for <HeroScreen />', () => { 

    test('should not show HeroScreen if there is no hero in the URL', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen/>} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        // console.log( wrapper.html() );
        expect( wrapper.find('h1').text().trim() ).toBe('No Hero Page');

    })

    test('should show a hero if parameter exists and is found', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen/>} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        // console.log( wrapper.html() );
        expect( wrapper.find('.row').exists() ).toBe(true);

    })
 })
