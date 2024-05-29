const Input = ({ handleChange1, value, title, name, color }) => {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange1} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;
