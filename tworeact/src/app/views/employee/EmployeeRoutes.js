import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const EmployeeList = Loadable(lazy(() => import('./EmployeeList')))
const EditEmployee = Loadable(lazy(() => import('./EditEmployee')))
const AddEmployee = Loadable(lazy(() => import('./AddEmployee')))

const employeeRoutes = [
    {
        path: '/employee',
        element: <EmployeeList />,
    },
    {
        path: '/employee/edit/:id',
        element: <EditEmployee />,
    },
    {
        path: '/employee/add',
        element: <AddEmployee />,
    },
]

export default employeeRoutes
