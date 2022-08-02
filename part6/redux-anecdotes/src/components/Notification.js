import { useSelector } from "react-redux"

const Notification = () => {
  const notificacion = useSelector(state => state.notification)
  if(!notificacion) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notificacion}
    </div>
  )
}

export default Notification