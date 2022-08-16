import React, { useEffect, useState,} from 'react'
import { getRecipes } from '../actions'
import Card from '../components/Card'
import { useDispatch, useSelector } from "react-redux";   
import Paginacion from '../components/Paginacion';
import Search from '../components/Search';
import Options from '../components/Options';
import Loading from '../components/Loading'
import styles from './Home.module.css'



const Home = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipe);
  let [loading, setLoading] = useState(true);

  //  console.log(recipes)

  //paginacion

  const [currentPage, setCurrentPage] = useState(1);
  const [couPerPage] = useState(9);
  const indexlast = currentPage * couPerPage; // devuelve 9
  const indexFirst = indexlast - couPerPage; // 0
  const allpages = recipes.slice(indexFirst, indexlast);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (allpages.length > 0 && loading) {
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const reload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <div>
        <Options set={setCurrentPage} />
      </div>
      <div>
        <button className={styles.buttons} onClick={reload}>
          {" "}
          <p>Reload</p>
        </button>
        <Search />
        
      </div>
      <Paginacion
        recipes={recipes.length}
        couPerPage={couPerPage}
        paginado={paginado}
      />
      <div className={styles.foodGrid}>
        {allpages.length > 0 && !loading ? (
          allpages?.map((r) => {
            return (
              <Card
                key={r.id}
                id={r.id}
                name={r.name}
                image={r.image}
                diets={r.type || r.diets?.map((e) => e.name)}
                score={r.score}
              />
            );
          })
        ) : !allpages.length > 0 && loading ? (
          <Loading />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Home