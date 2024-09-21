import React, { useEffect, useState } from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { SideBarData } from './SideBarData';
import './SideBar.css';

function SideBar({ isShow, onIsShowChange, updateAppearance }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(isShow)
    }, [isShow])

    const showSideBar = () => {
        onIsShowChange(!show)
        setShow(!show)
    };
    const sideMenuAction = (event) => {
        const targetElement = event.target;
        const key_value = event.target.getAttribute('data-index');
        const innerTitle = targetElement.innerText;
        if (innerTitle == 'LightModel') {
            updateAppearance({'theme': 'light'})
        } else if (innerTitle == 'DarkModel') {
            updateAppearance({'theme': 'dark'})
        } else if (innerTitle == 'Color') {
            updateAppearance({'textColor': 'red'})
        }
    }
    
    return (
        <nav className={show ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSideBar}>
                {/* <li className='navbar-toggle'>
                    <AiOutlineSetting/>
                </li> */}

                {
                    SideBarData.map((item, index) => {
                        return(
                            <li key={index} data-index={index} className={item.cName} onClick={sideMenuAction}>
                                { item.icon } 
                                <span>{item.title}</span>
                            </li>
                        )
                    })}
            </ul>
        </nav>
    );
}

export default SideBar;