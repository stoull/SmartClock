import React from 'react';
import { AiOutlineMoon, AiOutlineSun, AiOutlineSetting, AiOutlineBgColors, AiOutlineMenuFold,AiOutlineMenuUnfold, AiOutlineDoubleRight } from "react-icons/ai";


export const SideBarData = [
    {
        title: '',
        path: '/',
        icon: <AiOutlineDoubleRight />,
        cName: 'nav-text'
    },
    {
        title: 'LightModel',
        path: '/ThemeModel',
        icon: <AiOutlineSun />,
        cName: 'nav-text'
    },
    {
        title: 'DarkModel',
        path: '/ThemeModel',
        icon: <AiOutlineMoon />,
        cName: 'nav-text'
    },
    {
        title: 'Color',
        path: '/products',
        icon: <AiOutlineBgColors />,
        cName: 'nav-text'
    },
]