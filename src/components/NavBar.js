import React, {useEffect, useState} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { NavLink,Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const NavBar = () => {
    const [marcas, setMarcas] = useState([]);

    useEffect(()=>{
        const db= getFirestore();
        const dbMarcas = collection(db, 'marcas');
        getDocs(dbMarcas)
            .then(response => 
                setMarcas((response.docs.map((marc)=>({id: marc.id,...marc.data()} )))))
    },[]);
    // Traigo todas las marcas que hay en la coleccion de firestore
    
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container px-4 px-lg-5">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={`/`}>Inicio</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" href='/#'>Marcas</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {marcas.map((marca)=>
                                    <NavLink className="dropdown-item" key={marca.id} to={`/marcas/${marca.nombre}`}>{marca.nombre}</NavLink>
                                )}
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <CartWidget/> 
                    </div>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default NavBar
