import React, { useState, useEffect } from 'react';
import s from './Footer.module.scss';
import { ReactComponent as CocoonLogo } from '../../images/cocoonCompressed.svg';
import { FaInfo } from "react-icons/fa"

export const Footer = () => {
    const [screenWidth, setScreenHeight] = useState(window.innerHeight);
    const [isHelpVisible, setIsHelpVisible] = useState(false);
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
                            <div className={s.logo}>
                                <CocoonLogo></CocoonLogo>
                            </div>
                            <div className={s.copyright}><a href="https://cocoon.technology/"> ©Cocoon Technology 2023</a></div>
                            <div className={s.help}>
                                <span onClick={() => { setIsHelpVisible(true) }}>Help</span>
                            </div>
                        </div>
                    </nav>
                </footer>}
            {isHelpVisible ? <div className={s.help_container}>
                <div className={s.help_modal_window}>
                    <div className={s.help_close_btn}><button onClick={() => { setIsHelpVisible(false) }}>X</button></div>
                    <div className={s.help_modal_message}>
                        <h3>CONTACT</h3>
                        <div><span>Phone:</span>01923 477771</div>
                        <div><span>Email:</span> <a href={`mailto:ithelpdeskrequests@jdwetherspoon.co.uk`}>ithelpdeskrequests@jdwetherspoon.co.uk</a></div>
                    </div>
                </div>
            </div> : null}
        </div>

    );
};
