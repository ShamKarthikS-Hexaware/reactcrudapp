const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditEmployee from '../EditEmployee'
import { employeeAdded } from '../store/employeeSlice'
beforeAll(() => {
    store.dispatch(
        employeeAdded({
            id: 1,
            name: 'name',
            email: 'email',
            age: 99,
            online: false,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="employee/edit/1" replace />
                                }
                            />
                            <Route
                                path="employee/edit/:id"
                                element={<EditEmployee />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of EmployeeEdit Component', () => {
    test('should render EditEmployee and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveEmployeeButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const onlineElement = screen.getByLabelText(/Online/i)

        expect(saveEmployeeButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(emailElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(onlineElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Employee edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const onlineElement = screen.getByLabelText(/Online/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(emailElement, { target: { value: 'email' } })
        fireEvent.change(ageElement, { target: { value: 35 } })

        expect(nameElement.value).toBe('name')

        expect(emailElement.value).toBe('email')

        expect(ageElement.value).toBe('35')

        fireEvent.mouseDown(onlineElement)
        const onlinelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(onlinelistbox.getByText(/True/))
        expect(onlineElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const ageElement = screen.getByLabelText(/Age/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(emailElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveEmployeeButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveEmployeeButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
