const Persons = ({persons, filterTerm, handleDelete}) => {
  return (
    persons
      .filter((item) => item.name.indexOf(filterTerm) > -1)
      .map((item) => 
        <div key={item.id}>
          <span>{`${item.name} ${item.number}`} </span>
          <button onClick={() => handleDelete(item)}>delete</button>
        </div>
      )
  )
}

export default Persons;