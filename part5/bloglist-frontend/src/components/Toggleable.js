import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(props.defaultVisible || false)

    const toggleVisibility = () => { 
        setVisible(!visible) 
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    if (visible) {
        return (
            <div>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
        )
    }
})

Toggleable.propTypes = {
    defaultVisible: PropTypes.bool,
    buttonLabel: PropTypes.string.isRequired
}

export default Toggleable