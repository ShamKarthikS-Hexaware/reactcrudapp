import { configureStore } from '@reduxjs/toolkit'
import teacherReducer from '../views/teacher/store/teacherSlice'
import employeeReducer from '../views/employee/store/employeeSlice'
export default configureStore({
    reducer: {
        employee: employeeReducer,
        teacher: teacherReducer,
    },
})
