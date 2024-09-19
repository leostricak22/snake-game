import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import { createPortal } from 'react-dom'

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import Leaderboard from "./Leaderboard";

const MainMenu = forwardRef(function MainMenu({hasGameStarted, startGame, playerName, setPlayerName, score}, ref) {
    const dialog = useRef();
    const button = useRef(null);
    const [pressed, setPressed] = useState(false);
    const [keysPressed, setKeysPressed] = useState(false);

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }));

    const handleKeyDown = (e) => {
        if(e.key === "Escape")
            e.preventDefault();

        if(!pressed) {
            if(e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                setPressed(true)
            else
                setKeysPressed(true)

            return;
        }

        if (e.key === "Enter") {
            startGame();
        }
    };

    const handleNameChange = (e) => {
        setPlayerName(e.target.value);
        localStorage.setItem("playerName", e.target.value);
    };

    useEffect(() => {
        if (button.current) {
            button.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleTouch = () => {
            if (!pressed) {
                setPressed(true);
            }
        };

        window.addEventListener("touchstart", handleTouch);

        return () => {
            window.removeEventListener("touchstart", handleTouch);
        };
    }, [pressed]);

    return createPortal (
        (
            <>
                <div className="modal-overlay"></div>
                <dialog className="result-modal" ref={dialog} onKeyDown={handleKeyDown}>
                    <div className="modal-container">
                        {
                            (!pressed && hasGameStarted) ? (
                                <div className="score-container">
                                    <p className="score">Rezultat: <strong>{score}</strong></p>
                                    <p className="instruction">Pritisnite bilo koju tipku za nastavak.</p>
                                    {keysPressed && <p className="instruction">Osim <span className="arrowIcons"><FaArrowAltCircleLeft /> <FaArrowAltCircleRight/> <FaArrowAltCircleUp /> <FaArrowAltCircleDown /></span>.</p>}
                                </div>
                            ) : (
                                <>
                                    <div className="modal-content">
                                        <h2>Zmijica</h2>
                                        <p>Upišite ime da bi mogli započeti igru:</p>
                                        <div className="nameForm">
                                            <input
                                                type="text"
                                                placeholder="Upišite ime"
                                                className="name-input"
                                                required
                                                value={playerName}
                                                onChange={handleNameChange}
                                            />
                                            <button ref={button} className="start-btn" onClick={startGame}>Započni</button>
                                        </div>
                                    </div>

                                    <Leaderboard />
                                </>
                            )
                        }
                    </div>
                </dialog>
            </>
                    ),
                    document.getElementById("modal")
                    )
                    })

export default MainMenu;