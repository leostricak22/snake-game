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
        setPlayerPosition(prevPlayerPosition => {
            const currentDirection = prevPlayerPosition.direction;

            switch (event.key) {
                case "ArrowRight":
                    if (currentDirection !== 'l' && currentDirection !== 'r') {
                        return {
                            ...prevPlayerPosition,
                            direction: "r"
                        };
                    }
                    break;
                case "ArrowDown":
                    if (currentDirection !== 'u' && currentDirection !== 'd') {
                        return {
                            ...prevPlayerPosition,
                            direction: "d"
                        };
                    }
                    break;
                case "ArrowLeft":
                    if (currentDirection !== 'r' && currentDirection !== 'l') {
                        return {
                            ...prevPlayerPosition,
                            direction: "l"
                        };
                    }
                    break;
                case "ArrowUp":
                    if (currentDirection !== 'd' && currentDirection !== 'u') {
                        return {
                            ...prevPlayerPosition,
                            direction: "u"
                        };
                    }
                    break;
                default:
                    break;
            }
            return prevPlayerPosition;
        });
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
            <Gameboard
                playerPosition={playerPosition}
                setPlayerPosition={setPlayerPosition}
                gameState={gameState}
                setGameState={setGameState}
            />
            <div className="signContainer">
                <h2 className="top-left">{playerPosition.positions.length-2}</h2>
                <img src={sign} alt={"sign"} className="signImage"/>
            </div>
        </div>
    );
}

export default App;
