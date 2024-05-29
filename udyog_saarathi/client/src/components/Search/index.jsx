import "./styles.css";

const Search = ({ setSearch }) => {

	const handleMouseLeave = (event) => {
		
		event.target.blur();
	  };
	return (
		<div className="fav px-4">
<div className="box1 ">
    <form name="search">
        
		<input
			type="text"
			className="input24"
			
			onChange={({ currentTarget: input }) => setSearch(input.value)}
			onMouseLeave={handleMouseLeave}
		/>
    </form>
    <i className="fas fa-search"></i>

</div>
		</div>
		

		
	);
};

export default Search;
