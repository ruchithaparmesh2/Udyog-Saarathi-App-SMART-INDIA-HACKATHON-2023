import styles from "./styles.module.css";

const Sort = ({ sort, setSort }) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({ sort: input.value, order: sort.order });
	};

	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className={styles.container}>
			<p className="m-0 p-1">Sort By :</p>
			<select
				onChange={onSelectChange}
				className={styles.select}
				defaultValue={sort.sort}
			>
				
				<option value="vacancies">vacancies</option>
			</select>
			<button className={styles.arrow_btn} onClick={onArrowChange}>
				<p className="m-0">&uarr;</p>
				<p className="m-0">&darr;</p>
			</button>
		</div>
	);
};

export default Sort;
