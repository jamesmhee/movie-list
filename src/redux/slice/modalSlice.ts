import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
    isOpen: boolean
    type: 'modal' | 'element' | null
    props?: unknown | null
}

const initialState: ModalState = {
    isOpen: false,
    type: 'modal',
    props: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ type: ModalState['type']; props: unknown }>) => {
            state.isOpen = true
            state.type = action.payload.type
            state.props = action.payload.props
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = null
            state.props = null
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
