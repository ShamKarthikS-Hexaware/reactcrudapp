import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
// import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    {/* <AuthProvider>{all_pages}</AuthProvider> */}
                    {all_pages}
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
