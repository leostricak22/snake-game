import Gameboard from "./components/Gameboard";
import sign from "./assets/sign.png";
import {useEffect, useRef, useState} from "react";
import MainMenu from "./components/MainMenu";

const INITIAL_PLAYER_POSITION = {
    positions: [{ x: 5, y: 5 }],
    direction: 'r'
}

function App() {
    const [playerPosition, setPlayerPosition] = useState(INITIAL_PLAYER_POSITION);

    const [gameState, setGameState] = useState(false);
    const [playerName, setPlayerName] = useState("")
    const dialog = useRef();

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

    useEffect(() => {
        if(!gameState)
            dialog.current.open();
    }, [gameState]);

    function startGame() {
        if(!playerName) {
            alert("Upišite ime.")
            return false
        }

        setPlayerPosition(INITIAL_PLAYER_POSITION)
        setGameState(true)
    }

    return (
        <div id="main" tabIndex="0" onKeyDown={handleKeyDown}>
            {!gameState && <MainMenu ref={dialog} startGame={startGame} setPlayerName={setPlayerName} playerName={playerName} score={playerPosition.positions.length-1}/>}
            <Gameboard
                playerPosition={playerPosition}
                setPlayerPosition={setPlayerPosition}
                gameState={gameState}
                setGameState={setGameState}
            />
            <div className="signContainer">
                <h2 className="top-left">{playerPosition.positions.length-1}</h2>
                <img src={sign} alt={"sign"} className="signImage"/>
            </div>
        </div>
    );
}

export default App;
