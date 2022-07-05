import store from 'app/redux/store'
import {
    employeeAdded,
    employeeDeleted,
    employeeUpdated,
} from '../employeeSlice'

describe('testing employee redux store reducers', () => {
    test('add employee to store test', () => {
        let state = store.getState().employee
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            email: 'email',
            age: 42,
            online: false,
        }
        store.dispatch(employeeAdded(initialInput))
        state = store.getState().employee
        expect(state.entities).toHaveLength(1)
    })

    test('update employee from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            email: 'email',
            age: 49,
            online: true,
        }
        store.dispatch(employeeAdded(initialInput))
        let state = store.getState().employee
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            email: 'email1',
            age: 98,
            online: true,
        }
        store.dispatch(employeeUpdated(updatedInput))
        state = store.getState().employee
        let changedEmployee = state.entities.find((p) => p.id === 2)
        expect(changedEmployee).toStrictEqual(updatedInput)
    })

    test('delete employee from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            email: 'email',
            age: 60,
            online: false,
        }
        store.dispatch(employeeAdded(initialInput))
        let state = store.getState().employee
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            employeeDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().employee
        expect(state.entities).toHaveLength(2)
    })
})
