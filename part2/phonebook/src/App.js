import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      // console.log(response)
      setPersons(response.data)
    })
  }, [])

  const handleChange = (e) => {
    if(e.target.name === 'name') setNewName(e.target.value);
    else setNewNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameExists = false;
    persons.forEach((item) => {
      if(item.name === newName) nameExists = true;
    })
    if(!nameExists) {
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewNumber('');
    } else alert(`${newName} is already added to the phonebook`);
    setNewName('');
  }

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter handleFilter={handleFilter} filterTerm={filterTerm}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        newName={newName} 
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterTerm={filterTerm}/>
    </div>
  )
}

export default App;
