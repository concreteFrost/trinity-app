import React, { useState, useEffect } from 'react';
import s from './Footer.module.scss';
import { ReactComponent as CocoonLogo } from '../../images/cocoonCompressed.svg';
import { FaMagento, FaArrowAltCircleUp, FaInfo } from "react-icons/fa"

export const Footer = () => {
    const [screenWidth, setScreenHeight] = useState(window.innerHeight);

    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isSmallScreen = screenWidth < 768;

    return (
        <div >
            {isSmallScreen && !isHovered ?
                <footer className={s.small_container}
                >
                    <FaInfo className={s.small_icon} onMouseEnter={() => { setIsHovered(true) }}
                    ></FaInfo>
                </footer>
                :
                <footer className={s.container} onMouseLeave={() => { setIsHovered(false) }} >
                    <nav>
                        <div className={s.grid}>
                            <div className={s.contact}>contact</div>
                            <div className={s.phone}> phone : +44 (0) 330 043 1705</div>
                            <div className={s.email}> email : support@e-cocoon.com</div>
                            <div className={s.copyright}>© Cocoon Technology</div>
                            <div className={s.logo}>
                                <CocoonLogo></CocoonLogo>
                            </div>
                        </div>
                        <div className={s.help}>
                            <a href="#">Help</a>
                        </div>
                    </nav>
                </footer>}

        </div>

    );
};
