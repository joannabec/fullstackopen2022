import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [ visibility, setVisibility ] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => ({ handleVisibility }))

  return (
    <div>
      { !visibility ?
        <button onClick={handleVisibility}>{props.buttonLabel}</button>
        :
        <div>
          {props.children}
          <button onClick={handleVisibility}>hide</button>
        </div>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable