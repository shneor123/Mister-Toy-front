import React, { useState, useEffect } from 'react';
import { storageService } from '../services/async-storage.service.js'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

export const BodyColor = () => {
    const { pathname } = useLocation()
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark')
        isDark ? storageService.saveToStorage('theme', 'dark') : storageService.saveToStorage('theme', 'bright')
    }, [isDark])

    const onToggleDarkMode = () => {
        setIsDark(!isDark)
    }

    return (
        <section>
            {pathname !== '/' && pathname !== '/about' && pathname !== '/login' && pathname !== '/signup' &&
                <div className='header-content flex justify-between align-center'>
                    {isDark && <BsFillSunFill className='toggle-darkmode-icon sun' onClick={() => { onToggleDarkMode() }} />}
                    {!isDark && <BsMoonStarsFill className='toggle-darkmode-icon moon' onClick={() => { onToggleDarkMode() }} />}
                </div>
            }
        </section>
    )
}
