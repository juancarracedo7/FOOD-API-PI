import React, { useEffect,} from 'react'
import { useDispatch} from 'react-redux'
import { getCreates, getFilterAsc, getFilterMax, getRecipes, getTypeDiet} from '../actions'
import { Link } from 'react-router-dom'
import styles from './Options.module.css'



const Options = ({set}) => {

    const dispatch = useDispatch()

   

    const handleByOrder =(e)=>{
        e.preventDefault()
        dispatch(getFilterAsc(e.target.value))
        set(1)
    }

    useEffect(() => {
      dispatch(getRecipes())
    }, [dispatch])


    const handlefilter = (e)=>{
        e.preventDefault()
        dispatch( getTypeDiet(e.target.value))
       set(1)
    }
    

    const sortByScore = (e)=>{
        e.preventDefault()
        dispatch(getFilterMax(e.target.value))
        set(1)
    }

    const handleCreate = (e)=>{
        e.preventDefault()
        dispatch(getCreates(e.target.value))
        set(1)
    }
    
  return (
    <div className={styles.flexi}>
        <Link to="/create" className={styles.crea} >
            <button>Create Recipes</button>
        </Link>
        <div>
            {/* <img/> */}
        </div>
        <div>
        <label htmlFor="">Filter By:</label>
        <select onChange={(e)=> handleCreate(e)} >
                    <option value='ALL'> Total Recipes </option>
                    <option value='createdInDb'> Recipes Created </option>
                    <option value='JE'> Recipes Api </option> 
                </select>
        </div>
        <div>
        <label htmlFor="">Filter By A-Z:</label>
            <select  onChange={handleByOrder}>
                <option >Alphabetical Order</option>
                <option value="asc"> A-Z </option>
                <option value="desc"> Z-A </option>
            </select>
        </div>

        <div>
            <label htmlFor="">Diet Types:</label>
            <select  onChange={handlefilter}>
                <option value="All">Types..</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="vegan">Vegan</option>
                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                <option value="fodmap friendly">Formap Friendly</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="whole 30">Whole 30</option>
                <option value="vegetarian">Vegetarian</option>
            </select>
        </div>

        <div>
                <label htmlFor="">Score:</label>
                     <select onChange={sortByScore}>
                        <option>Score:</option>
                        <option value="max">Max Score</option>
                        <option value="min">Min Score</option>
                    </select>
         </div>
    </div>
  )
}

export default Options