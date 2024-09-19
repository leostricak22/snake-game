import Gameboard from "./components/Gameboard";
import {useCallback, useEffect, useRef, useState} from "react";
import MainMenu from "./components/MainMenu";
import Credit from "./components/Credit";

const INITIAL_PLAYER_POSITION = {
    positions: [{ x: 5, y: 5, direction: 'r' }, { x: 5, y: 4, direction: 'r' }],
    nextDirection: 'r'
}

let startX=0;
let startY=0;

function App() {
    const [playerPosition, setPlayerPosition] = useState(INITIAL_PLAYER_POSITION);

    const [gameState, setGameState] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "")
    const dialog = useRef();

    const saveScore = useCallback(() => {
        if (hasGameStarted) {
            fetch('http://192.168.253.191:5000/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playerName,
                    maxScore: playerPosition.positions.length - INITIAL_PLAYER_POSITION.positions.length,
                }),
            }).catch((error) => {
                console.error("Error posting scores:", error);
            });
        }
    }, [hasGameStarted, playerName, playerPosition.positions]);


    useEffect(() => {
        if(gameState === false && hasGameStarted)
            saveScore();
    }, [gameState, hasGameStarted, saveScore]);

    function handleKeyDown(event) {
        setPlayerPosition(prevPlayerPosition => {
            const currentDirection = prevPlayerPosition.positions[0].direction;

            switch (event.key) {
                case "ArrowRight":
                    if (currentDirection !== 'l' && currentDirection !== 'r') {
                        return {
                            ...prevPlayerPosition,
                            nextDirection: "r"
                        };
                    }
                    break;
                case "ArrowDown":
                    if (currentDirection !== 'u' && currentDirection !== 'd') {
                        return {
                            ...prevPlayerPosition,
                            nextDirection: "d"
                        };
                    }
                    break;
                case "ArrowLeft":
                    if (currentDirection !== 'r' && currentDirection !== 'l') {
                        return {
                            ...prevPlayerPosition,
                            nextDirection: "l"
                        };
                    }
                    break;
                case "ArrowUp":
                    if (currentDirection !== 'd' && currentDirection !== 'u') {
                        return {
                            ...prevPlayerPosition,
                            nextDirection: "u"
                        };
                    }
                    break;
                default:
                    break;
            }
            return prevPlayerPosition;
        });
    }

    let handleTouchEnd;
    handleTouchEnd = event => {
        if (!gameState)
            return;

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        setPlayerPosition(prevPlayerPosition => {
            const currentDirection = prevPlayerPosition.positions[0].direction;
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0 && currentDirection !== 'l'  && currentDirection !== 'r') {
                    return {
                        ...prevPlayerPosition,
                        nextDirection: "r"
                    };
                } else if (diffX < 0 && currentDirection !== 'r'  && currentDirection !== 'l') {
                    return {
                        ...prevPlayerPosition,
                        nextDirection: "l"
                    };
                }
            } else {
                if (diffY > 0 && currentDirection !== 'u'  && currentDirection !== 'd') {
                    return {
                        ...prevPlayerPosition,
                        nextDirection: "d"
                    };
                } else if (diffY < 0 && currentDirection !== 'd'  && currentDirection !== 'u') {
                    return {
                        ...prevPlayerPosition,
                        nextDirection: "u"
                    };
                }
            }
            return prevPlayerPosition
        });
    };

    let handleTouchStart;
    handleTouchStart = event => {
        if (!gameState)
            return;

        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            handleKeyDown(event);
        };
        const handleTouchStartPress = (event) => {
            handleTouchStart(event);
        };
        const handleTouchEndPress = (event) => {
            handleTouchEnd(event);
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('touchstart', handleTouchStartPress);
        window.addEventListener('touchend', handleTouchEndPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('touchstart', handleTouchStartPress);
            window.removeEventListener('touchend', handleTouchEndPress);
        };
    }, [handleTouchEnd, handleTouchStart]);

    useEffect(() => {
        if(!gameState)
            dialog.current.open();
    }, [gameState]);

    function startGame() {
        if(!playerName) {
            alert("Upišite ime.")
            return false
        }

        setHasGameStarted(true);
        setPlayerPosition(INITIAL_PLAYER_POSITION)
        setGameState(true)
    }

    return (
        <div id="main" tabIndex="0" onKeyDown={handleKeyDown}>
            {!gameState &&
                <MainMenu ref={dialog} startGame={startGame} setPlayerName={setPlayerName} playerName={playerName} score={playerPosition.positions.length - INITIAL_PLAYER_POSITION.positions.length} hasGameStarted={hasGameStarted} />}
            <Gameboard
                playerPosition={playerPosition}
                setPlayerPosition={setPlayerPosition}
                gameState={gameState}
                setGameState={setGameState}
            />
            <div className="signContainer">
                <h2 className="top-left">{playerPosition.positions.length-INITIAL_PLAYER_POSITION.positions.length}</h2>
                <div className="signImage"/>
            </div>
            <Credit />
        </div>
    );
}

export default App;
