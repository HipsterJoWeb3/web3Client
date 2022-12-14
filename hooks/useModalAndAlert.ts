import {toast} from "react-toastify";


export const toastSuccess = (message: string) => {
    return toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-popup',
        icon: false,
        closeButton: true,

    })
}

export const toastError = (message: string) => {
    return toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-popup',
        icon: false,
        closeButton: true,
    })
}