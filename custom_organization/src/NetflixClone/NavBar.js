import React, { useEffect, useState } from 'react'
import './nav.css'

function NavBar(){
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            }
            else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);


    return(
        <div className={`navBar ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="https://www.abacustechnologies.com/wp-content/uploads/2020/05/580b57fcd9996e24bc43c529.png"
                alt="netflix logo"
            />

            <img
                className="nav_logo_avatar"
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="netflix avatar"
            />

        </div>
    )
}

export default NavBar