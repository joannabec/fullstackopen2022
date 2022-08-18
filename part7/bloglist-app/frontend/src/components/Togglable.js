import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../style/elements'

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => ({ handleVisibility }))

  return (
    <div>
      {!visibility ? (
        <Button onClick={handleVisibility}>{props.buttonLabel}</Button>
      ) : (
        <div>
          {props.children}
          <Button onClick={handleVisibility}>hide</Button>
        </div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
