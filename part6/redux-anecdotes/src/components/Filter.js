import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const input = event.target.value
    props.setFilter(input)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {setFilter})(Filter)
