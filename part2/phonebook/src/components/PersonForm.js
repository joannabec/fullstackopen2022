const PersonForm = ({handleSubmit, handleChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>name: </label>
          <input id="name" name="name" onChange={handleChange} value={newName} />
        </div>
        <div>
          <label>number: </label>
          <input name="number" onChange={handleChange} value={newNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;