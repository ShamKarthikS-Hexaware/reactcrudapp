import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../views/employee/store/employeeSlice'
export default configureStore({ reducer: { employee: employeeReducer } })
