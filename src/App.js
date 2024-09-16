import Gameboard from "./components/Gameboard";
import sign from "./assets/sign.png";
import {useEffect, useState} from "react";

function App() {
    const [playerPosition, setPlayerPosition] = useState({
        positions: [{ x: 5, y: 5 }],
        direction: 'r'
    });

    const [gameState, setGameState] = useState(true);

    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowRight":
                setPlayerPosition(prevPlayerPosition => ({
                    ...prevPlayerPosition,
                    direction: "r"
                }));
                return;
            case "ArrowDown":
                setPlayerPosition(prevPlayerPosition => ({
                    ...prevPlayerPosition,
                    direction: "d"
                }));
                return;
            case "ArrowLeft":
                setPlayerPosition(prevPlayerPosition => ({
                    ...prevPlayerPosition,
                    direction: "l"
                }));
                return;
            case "ArrowUp":
                setPlayerPosition(prevPlayerPosition => ({
                    ...prevPlayerPosition,
                    direction: "u"
                }));
                return;
            default:
                return;
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            handleKeyDown(event);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div id="main" tabIndex="0" onKeyDown={handleKeyDown}>
            <Gameboard playerPosition={playerPosition} setPlayerPosition={setPlayerPosition} gameState={gameState} setGameState={setGameState} />
            <div className="signContainer">
                <h2 className="top-left">{playerPosition.positions.length-2}</h2>
                <img src={sign} alt={"sign"} className="signImage"/>
            </div>
        </div>
    );
}

export default App;
