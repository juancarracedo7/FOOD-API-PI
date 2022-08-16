import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getByName } from '../actions'
import styles from './Search.module.css'



const Search = () => {

  
    // const recipe= useSelector((state)=> state.recipe)
    const dispatch =  useDispatch()
    const [name,SetName]= useState("")
   

      

    const handleChange = (e)=>{
        e.preventDefault()
          SetName(e.target.value)
        
  
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!name){
            alert('no se encontro ese personaje')
        } else {
            dispatch(getByName(name));
          SetName('');
        }
          
          
      }
    
   
  


  return (
    <div  onSubmit={handleSubmit} className={styles.form}>
   
      <form action="">
        <input type="text"
                placeholder='Search Recipe...'
                value={name}
                onChange={handleChange}
                autoComplete='off'
               
            />
            </form>
         
           
            <button className={styles.Button} onClick={handleSubmit}  type="submit" value="">Search</button>
    </div>
  )
}

export default Search