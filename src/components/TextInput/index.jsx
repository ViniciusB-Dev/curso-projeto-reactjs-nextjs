import './styles.css';

export const TextInput = ({ searchValue, handleChange}) => {

  return (
    <input
      placeholder='Type your seach'
      className='text-imput'
      onChange={handleChange}
      value={searchValue}
      type="search"
    />
  )
}