const SearchFilter = ({ handleFilter, filterTerm }) => {
  return (
    <>
      <label>filter shown with </label>
      <input type="text" onChange={handleFilter} value={filterTerm} />
    </>
  )
}

export default SearchFilter;