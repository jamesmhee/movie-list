import { AppDispatch, RootState } from '@/redux/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Atoms/Button'
import { closeModal } from '@/redux/slice/modalSlice'
import { isPending } from '@reduxjs/toolkit'

const Modal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isOpen, type, props } = useSelector((state: RootState) => state.modal)

    const handleClose = () => {
        ;(document.querySelector('#my_modal_2') as HTMLDialogElement)?.close()
        dispatch(closeModal())
    }

    useEffect(() => {
        if (isOpen) {
            ;(document.querySelector('#my_modal_2') as HTMLDialogElement)?.showModal()
        }
    }, [dispatch, isOpen])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.code === 'Escape') {
                handleClose()
            }
        }
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [])

    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-backdrop" onClick={handleClose}></div>
                <div className="relative modal-box flex flex-col w-sm md:w-3xl md:max-w-[90%]! h-[90%] my-5!">
                    <Button
                        className="absolute z-20 top-6 p-2! right-6 btn-circle"
                        onClick={handleClose}
                    >
                        X
                    </Button>
                    {type === 'modal' ? (
                        <div className="p-5!">
                            <h3 className="font-bold text-lg">{props?.title}</h3>
                            <p className="py-4">Press ESC key or click outside to close</p>
                        </div>
                    ) : (
                        type === 'element' && <>{props?.element}</>
                    )}
                </div>
            </dialog>
        </>
    )
}
export default Modal
