import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'app/redux/store'
import {
    fetchEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
} from '../employee.action'

const getEmployeeListResponse = [
    {
        id: 1,
        name: 'name',
        email: 'email',
        age: 61,
        online: true,
    },
]

const addEmployeeListResponse = (data) => {
    return { id: 2, ...data }
}
const editEmployeeListResponse = (data) => {
    return data
}

describe('should test Employee redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'employee'
    test('Should be able to fetch the employee list and update employee redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getEmployeeListResponse)
        const result = await store.dispatch(fetchEmployee())
        const employeeList = result.payload
        expect(result.type).toBe('employee/fetchEmployee/fulfilled')
        expect(employeeList).toEqual(getEmployeeListResponse)

        const state = store.getState().employee
        expect(state.entities).toEqual(employeeList)
    })

    test('Should be able to add new employee to list and make post api and update employee redux store', async () => {
        const body = {
            name: 'name',
            email: 'email',
            age: 95,
            online: false,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addEmployeeListResponse(body)
        )
        const result = await store.dispatch(addEmployee(body))
        const employeeItem = result.payload
        expect(result.type).toBe('employee/addEmployee/fulfilled')
        expect(employeeItem).toEqual(addEmployeeListResponse(body))

        const state = store.getState().employee
        expect(state.entities).toContainEqual(addEmployeeListResponse(body))
    })

    test('Should be able to edit employee in list and make put api call and update employee redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            email: 'email',
            age: 31,
            online: false,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editEmployeeListResponse(body)
        )
        const result = await store.dispatch(editEmployee(body))
        const employeeItem = result.payload
        expect(result.type).toBe('employee/editEmployee/fulfilled')
        expect(employeeItem).toEqual(editEmployeeListResponse(body))

        const state = store.getState().employee
        let changedEmployee = state.entities.find((p) => p.id === body.id)
        expect(changedEmployee.name).toEqual(body.name)
    })

    test('Should be able to delete employee in list and update employee redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().employee
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteEmployee(input))
        const deletId = result.payload
        expect(result.type).toBe('employee/deleteEmployee/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().employee
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
