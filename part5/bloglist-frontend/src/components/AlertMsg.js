const AlertMsg = ({ alert }) => {
  const style = {
    color: alert.type === 'error' ? 'red' : 'green',
    fontSize: 20,
    display: 'inline-block',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <span style={style}>
      {alert.message}
    </span>
  )
}

export default AlertMsg