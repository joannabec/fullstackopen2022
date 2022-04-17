import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    services.getPersons()
      .then((resp) => setPersons(resp));
  }, [])

  const handleChange = (e) => {
    if(e.target.name === 'name') setNewName(e.target.value);
    else setNewNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const personToUpdate = persons.find((item) => item.name === newName);
    if(!personToUpdate) {
      services.addPerson({name: newName, number: newNumber})
        .then((resp) => setPersons(persons.concat(resp)));
      setNewNumber('');
      setNewName('');
    } else {
      const result = window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`);

      if(result) {
        services.updatePerson({...personToUpdate, number: newNumber})
        .then((resp) => setPersons(
          persons.map((item) => item.id === resp.id ? resp : item)
        ));
        setNewName('');
        setNewNumber('');
      }
    } 
  }

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
  }

  const handleDelete = (item) => {
    const result = window.confirm(`Are you sure you want to delete ${item.name}`);

    if (result) {
      services.deletePerson(item.id)
      .then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((person) => person.id !== item.id));
        }
      });
    }
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
      <Persons persons={persons} filterTerm={filterTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App;
