import { Link } from 'react-router-dom'
import styles from './Card.module.css'


const Card = ({id,name,diets,image,score,}) => {

console.log('queonda',diets)
    

  return (
    <div className={styles.container}>
     
        <div>
          
        <Link  to={`/recipe/${id}`} className={styles.Link}>
            <p className={styles.name}>{name}</p>
        
            <img className={styles.image} width={240}  height={240} src={image} alt="" />
            <p className={styles.score}>Score: {score}</p>
            <div className={styles.diets}>

         {diets?.map((type, index) =>
          type.name ? (
            <li key={index}>{type.name}</li>
          ) : (
            <li key={index}>{type}</li>
          )
        )}
      </div>
      </Link>
        </div>
  
    </div>
  )
}

export default Card