import React, { useState } from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { SideBarData } from './SideBarData';
import './SideBar.css';

function SideBar() {
    const [show, setShow] = useState(false);
    const showSideBar = () => setShow(!show);
    // const showSideBar = () => {
    //     console.log("xxxxx test log here")
    // }
    
    return (
        <>
            <div className='sidebar'>
                <AiOutlineSetting onClick={showSideBar} />
            </div>
            <nav className={show ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    <li className='navbar-toggle'>
                        <AiOutlineSetting/>
                    </li>

                    {
                        SideBarData.map((item, index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    { item.icon } 
                                    <span>{item.title}</span>
                                </li>
                            )
                        })}
                </ul>
            </nav>
        </>
    );
}

export default SideBar;