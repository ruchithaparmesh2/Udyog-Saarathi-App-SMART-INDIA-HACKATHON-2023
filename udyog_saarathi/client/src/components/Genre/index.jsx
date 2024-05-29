import styles from "./styles.module.css";

const Genre = ({ cat, filterCat, setFilterCat }) => {
	// console.log(cat,"hello", filterCat,"world", setFilterCat)
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterCat, input.value];
			setFilterCat(state);
		} else {
			const state = filterCat.filter((val) => val !== input.value);
			setFilterCat(state);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className="fw-bolder fs-3">Filter By Category</h1>
			<div className={styles.genre_container}>
				{cat.map((genre) => (
					<div className={styles.genre} key={genre}>
						<input
							className={styles.genre_input}
							type="checkbox"
							value={genre}
							onChange={onChange}
						/>
						<p className={styles.genre_label}>{genre}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Genre;
