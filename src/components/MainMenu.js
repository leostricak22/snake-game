import {forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from 'react-dom'

const MainMenu = forwardRef(function MainMenu({startGame, playerName, setPlayerName, score}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }));

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
        }
    };

    const handleNameChange = (e) => {
        setPlayerName(e.target.value);
    };

    return createPortal (
        (
            <>
                <div className="modal-overlay"></div>
                <dialog className="result-modal" ref={dialog} onKeyDown={handleKeyDown}>
                    <div className="modal-container">
                        <div className="modal-content">
                            <h2>Zmijica</h2>
                            <h3>Osvojili ste: <strong>{score}</strong> bodova</h3>
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
                                <button className="start-btn" onClick={startGame}>Započni</button>
                            </div>
                        </div>

                        <div className="leaderboard-container">
                            <h3>Ljestvica</h3>
                            <ul className="leaderboard-list">
                                <li>1. Player1 - 100</li>
                                <li>2. Player2 - 95</li>
                                <li>3. Player3 - 90</li>
                                <li>4. Player4 - 85</li>
                                <li>5. Player5 - 80</li>
                            </ul>
                        </div>
                    </div>
            </dialog>
        </>
    ),
    document.getElementById("modal")
    )
})

export default MainMenu;