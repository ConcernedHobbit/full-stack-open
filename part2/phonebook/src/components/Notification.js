const Notification = ({ urgency, message }) => {
    if (message === null || message.length === 0) return null

    const divClass = `notification ${urgency}`
    return (
        <div class={divClass}>
            <p>{message}</p>
        </div>
    )
}

export default Notification