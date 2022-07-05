const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EmployeeList from '../EmployeeList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Employee rows when api response has data', async () => {
    const endPoint = 'employee'
    const getEmployeeListResponse = [
        {
            id: 1,
            name: 'name1',
            email: 'email1',
            age: 76,
            online: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getEmployeeListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <EmployeeList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const employeeNameCell = await screen.findByText(/name1/i)

    expect(employeeNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
