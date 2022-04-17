import axios from 'axios'

const getPersons = () => {
  return axios.get('http://localhost:3001/persons')
  .then((response) => response.data);
}

const addPerson = newPerson => {
  return axios.post('http://localhost:3001/persons', newPerson)
  .then((response) => response.data);
}

const deletePerson = id => {
  return axios.delete(`http://localhost:3001/persons/${id}`)
  .then((response) => response);
}

const updatePerson = updatedObj => {
  return axios.put(`http://localhost:3001/persons/${updatedObj.id}`, updatedObj)
  .then((response) => response.data);
}

export default { getPersons, addPerson, deletePerson, updatePerson }