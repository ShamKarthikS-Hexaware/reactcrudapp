import NotFound from 'app/views/sessions/NotFound'
import teacherRoutes from 'app/views/teacher/TeacherRoutes'
import employeeRoutes from 'app/views/employee/EmployeeRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'app/views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [...homeRoutes, ...employeeRoutes, ...teacherRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
