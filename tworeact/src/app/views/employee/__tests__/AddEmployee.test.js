const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddEmployee from '../AddEmployee'

beforeEach(() => {
    const endPoint = 'employee'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            email: 'email',
            age: 13,
            online: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddEmployee />
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

describe('testing view EmployeeAdd Component', () => {
    test('should render AddEmployee and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addEmployeeButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const onlineElement = screen.getByLabelText(/Online/i)

        expect(addEmployeeButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(emailElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(onlineElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Employee add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const onlineElement = screen.getByLabelText(/Online/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(emailElement, { target: { value: 'email' } })
        fireEvent.change(ageElement, { target: { value: 27 } })

        fireEvent.mouseDown(onlineElement)
        const onlinelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(onlinelistbox.getByText(/True/))
        expect(onlineElement).toHaveTextContent(/True/i)
    })

    test('should return error message when add Employee button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addEmployeeButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addEmployeeButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
