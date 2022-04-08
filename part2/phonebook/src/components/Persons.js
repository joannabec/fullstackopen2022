const Persons = ({persons, filterTerm}) => {
  return (
    persons
      .filter((item) => item.name.indexOf(filterTerm) > -1)
      .map((item) => <p key={item.name}>{`${item.name} ${item.number}`}</p>)
  )
}

export default Persons;