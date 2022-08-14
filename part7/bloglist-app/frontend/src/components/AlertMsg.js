import { useSelector } from 'react-redux'

const AlertMsg = () => {
  const alert = useSelector(state => state.notification)
  const style = {
    color: alert.type === 'error' ? 'red' : 'green',
    fontSize: 20,
    display: 'inline-block',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!alert.message) return null

  return (
    <span className="alert" style={style}>
      {alert.message}
    </span>
  )
}

export default AlertMsg
