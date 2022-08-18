import { useSelector } from 'react-redux'
import { Alert } from '../style/elements'

const AlertMsg = () => {
  const alert = useSelector(state => state.notification)

  if (!alert.message) return null

  return (
    <Alert type={alert.type}>
      <span className="alert">
        {alert.message}
      </span>
    </Alert>
  )
}

export default AlertMsg
