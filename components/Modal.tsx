


const Modal = ({ children, onClose }) => {
    const [isBrowser, setIsBrowser] = useState(false)
    useEffect(() => setIsBrowser(true), [])

    const handleClose = e => {
        e.preventDefault()
        onClose()
    }

    const modalContent = isBrowser ? (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
            <a href="#" onClick={handleClose} className={styles.close}>
            &times;
            </a>
            {children}
        </div>
        </div>
    ) : null

    return isBrowser ? ReactDOM.createPortal(modalContent, document.body) : null
}