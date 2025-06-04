
import styles from "./table-header.module.css"
const TableHeader = () => {
  return (
	<div className={styles.container}>
		<p className={styles.cars}>CARS</p>
		<p className={styles.prices}>PRICES</p>
		<p className={styles.actions}>ACTIONS</p>
	</div>
  )
}

export default TableHeader