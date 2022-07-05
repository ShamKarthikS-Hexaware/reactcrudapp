import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployee } from './employee.action'
import { addEmployee } from './employee.action'
import { editEmployee } from './employee.action'
import { deleteEmployee } from './employee.action'

const fetchEmployeeExtraReducer = {
    [fetchEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [fetchEmployee.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const addEmployeeExtraReducer = {
    [addEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [addEmployee.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const editEmployeeExtraReducer = {
    [editEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [editEmployee.fulfilled]: (state, action) => {
        const { id, name, email, age, online } = action.payload
        const existingEmployee = state.entities.find(
            (employee) => employee.id.toString() === id.toString()
        )
        if (existingEmployee) {
            existingEmployee.name = name
            existingEmployee.email = email
            existingEmployee.age = age
            existingEmployee.online = online
        }
        state.loading = false
    },
    [editEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteEmployeeExtraReducer = {
    [deleteEmployee.pending]: (state, action) => {
        state.loading = true
    },
    [deleteEmployee.fulfilled]: (state, action) => {
        const id = action.payload
        const existingEmployee = state.entities.find(
            (employee) => employee.id.toString() === id.toString()
        )
        if (existingEmployee) {
            state.entities = state.entities.filter(
                (employee) => employee.id !== id
            )
        }
        state.loading = false
    },
    [deleteEmployee.rejected]: (state, action) => {
        state.loading = false
    },
}
const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        employeeAdded(state, action) {
            state.entities.push(action.payload)
        },
        employeeUpdated(state, action) {
            const { id, name, email, age, online } = action.payload
            const existingEmployee = state.entities.find(
                (employee) => employee.id.toString() === id.toString()
            )
            if (existingEmployee) {
                existingEmployee.name = name
                existingEmployee.email = email
                existingEmployee.age = age
                existingEmployee.online = online
            }
        },
        employeeDeleted(state, action) {
            const { id } = action.payload
            const existingEmployee = state.entities.find(
                (employee) => employee.id.toString() === id.toString()
            )
            if (existingEmployee) {
                state.entities = state.entities.filter(
                    (employee) => employee.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchEmployeeExtraReducer,
        ...addEmployeeExtraReducer,
        ...editEmployeeExtraReducer,
        ...deleteEmployeeExtraReducer,
    },
})

export const { employeeAdded, employeeUpdated, employeeDeleted } =
    employeeSlice.actions

export default employeeSlice.reducer
