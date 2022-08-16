import React from 'react'
import styles from './Paginacion.module.css'

const Paginacion = ({ recipes, couPerPage, paginado }) => {
    const pageNumber = [];

	for (let i = 1; i <= Math.ceil(recipes / couPerPage); i++) {
		pageNumber.push(i);
	}

    return (
        <nav>
				<ul className={styles.ul}>
					{pageNumber &&
						pageNumber.map((n) => (
							<li key={n} className={styles.li}>
								<button className={styles.button} onClick={() => paginado(n)}>{n}</button>
							</li>
						))}
				</ul>
			</nav>
  )
}

export default Paginacion