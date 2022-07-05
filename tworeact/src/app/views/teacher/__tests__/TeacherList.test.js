const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import TeacherList from '../TeacherList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Teacher rows when api response has data', async () => {
    const endPoint = 'teacher'
    const getTeacherListResponse = [
        {
            id: 1,
            name: 'name1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getTeacherListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <TeacherList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const teacherNameCell = await screen.findByText(/name1/i)

    expect(teacherNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
