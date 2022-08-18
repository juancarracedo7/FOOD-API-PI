import React from "react";
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={styles.landing}>
        <div className={styles.flex}>
         <Link to="/home">
             <button className={styles.button}>
                 <span className={styles.h1}>🍝</span>
             </button>
             </Link>
        </div>
     </div>
    )
}