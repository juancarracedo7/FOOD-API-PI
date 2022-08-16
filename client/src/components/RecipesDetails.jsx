import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useHistory, useParams } from 'react-router-dom'
import { cleanData, getDetail, Remove } from '../actions'
import s from './RecipesDetails.module.css'

const RecipesDetail = () => {
   const {id}=useParams()
    const dispatch = useDispatch()
 let history= useHistory()
    const details = useSelector((state)=> state.detail)
     console.log('hola',details)
    
    useEffect(() => {
      dispatch(getDetail(id))
     return dispatch(cleanData(id))
    }, [dispatch,id])

   


    function handle (e){
    e.preventDefault(e)
    dispatch(Remove(id))
    alert("successfully deleted")
    history.push("/home")
        return dispatch(cleanData(id))
    }
    
  

    
  return (
    <div className={s.contenedor}>
      <div className={s.carto}>
        <Link to="/home">
          <span className={s.backButton}>Back </span>
        </Link>

        <div className={s.titlee}>
          {details.name ? <h1>{details.name}</h1> : <h1>Loading...</h1>}
        </div>

        <div >
          {details.Diets ? (
            <button className={s.crux} onClick={(e) => handle(e)}>
              Remove
            </button>
          ) : (
            ""
          )}
          <div>
            <img
              className={s.im}
              src={
                details.image ? details.image : "https://i.gifer.com/ER46.gif"
              }
              alt="Pic not found"
            />
          </div>

          <div className={s.diet}>
            <h3 className={s.textsss}>Diet Type:</h3>

            {/* {details.Diets ? (
              details.Diets.map((e, i) => (
                <h2 key={i} className={s.dishesanddiets}>
                  {e.type}
                </h2>
              ))
            ) : (
              <h4 className={s.dishesanddiets}>{details.type}</h4>

            )} */}
            { <h4 className={s.dishesanddiets}>{!details.createdInDb ? details.type?.map(el=> el + "  " ) : details.diets?.map(el => el.name + "   ")}</h4>}
          </div>

          <div className={s.dish}>
            <h3 className={s.disty}>Dish Types:</h3>
            <h3 className={s.h}>{details.dishTypes}</h3>
          </div>
        </div>

        <div className={s.score}>
          <h3 className={s.t}>Score:{details.score} ✔</h3>
          <h3 className={s.t}>
            <span>Healthiness points:</span>
            {details.healthyScore || details.healhyScore} ✔
          </h3>
        </div>

        <div className={s.sum}>
          <div className={s.sumar}>
            <h4 className={s.tebla}>Summary</h4>
            <p className={s.sm}>
              {details.summary
                ? details.summary.replace(/<[^>]*>/g, "")
                : "not found"}
            </p>
          </div>
          <div className={s.stepp}>
            <h4 className={s.tebla}>Steps:</h4>
            {Array.isArray(details.steps) ? (
              details.steps.map((e) => (
                <li className={s.are} key={e.number}>
                  {e.step}
                </li>
              ))
            ) : (
              <li className={s.ares}>{details.steps}</li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipesDetail



