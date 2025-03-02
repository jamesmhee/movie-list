import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
    isOpen: boolean
    type: 'modal' | 'element' | null
    props?: {
        title?: string
        text?: string
        element?: React.JSX.Element | React.JSX.Element[]
    } | null
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
        openModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
            state.isOpen = true
            state.type = action.payload.type
            state.props = action.payload.props
        },
        updateModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen' | 'type'>>) => {
            if (state.isOpen) {
                state.props = {
                    ...state.props,
                    element: action.payload.props?.element,
                }
            }
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = null
            state.props = null
        },
    },
})

export const { openModal, updateModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
