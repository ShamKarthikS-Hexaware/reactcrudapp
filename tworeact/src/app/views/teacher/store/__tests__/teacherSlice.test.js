import store from 'app/redux/store'
import { teacherAdded, teacherDeleted, teacherUpdated } from '../teacherSlice'

describe('testing teacher redux store reducers', () => {
    test('add teacher to store test', () => {
        let state = store.getState().teacher
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
        }
        store.dispatch(teacherAdded(initialInput))
        state = store.getState().teacher
        expect(state.entities).toHaveLength(1)
    })

    test('update teacher from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
        }
        store.dispatch(teacherAdded(initialInput))
        let state = store.getState().teacher
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
        }
        store.dispatch(teacherUpdated(updatedInput))
        state = store.getState().teacher
        let changedTeacher = state.entities.find((p) => p.id === 2)
        expect(changedTeacher).toStrictEqual(updatedInput)
    })

    test('delete teacher from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
        }
        store.dispatch(teacherAdded(initialInput))
        let state = store.getState().teacher
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            teacherDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().teacher
        expect(state.entities).toHaveLength(2)
    })
})
