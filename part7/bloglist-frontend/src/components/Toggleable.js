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
      <div className="w-max">
        {props.children}
        <button onClick={toggleVisibility} className="h-7 bg-red-300 hover:bg-red-400 w-full text-white rounded focus:outline-none focus:shadow-outline">cancel</button>
      </div>
    )
  } else {
    return (
      <div className="w-max">
        <button onClick={toggleVisibility} className="h-7 bg-green-300 hover:bg-green-400 w-full px-4 text-white rounded focus:outline-none focus:shadow-outline">{props.buttonLabel}</button>
      </div>
    )
  }
})

Toggleable.propTypes = {
  defaultVisible: PropTypes.bool,
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable