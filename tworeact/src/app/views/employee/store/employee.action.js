import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'employee'

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const employee = await response.data
        return employee
    }
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const employee = await response.data
        thunkAPI.dispatch(showSuccess('Employee added successfully'))
        return employee
    }
)

export const editEmployee = createAsyncThunk(
    'employee/editEmployee',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const employee = await response.data
        thunkAPI.dispatch(showSuccess('Employee updated successfully'))
        return employee
    }
)

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected employee deleted successfully.')
            )
            return data.id
        }
    }
)
