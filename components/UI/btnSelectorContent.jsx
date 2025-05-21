export default function BtnSelectorContent({ title, text, children }) {
    return (
        <>
        <span className='btn-selector-content'>
            <span className='icon-settings'>{children}</span>
            <span className='two-lines-text'>
                <span className='text-4'>{title}</span>
                <span className='text-6'>{text}</span>
            </span>
        </span>
        <span className="icon-circle"></span>
        </>
    )
}