import { useState } from 'react'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

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
