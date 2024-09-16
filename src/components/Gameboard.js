import {useEffect, useRef, useState} from "react";
import playerImg from "../assets/player.png";
import enemy1Img from "../assets/enemy1.png";
import enemy2Img from "../assets/enemy2.png";
import enemy3Img from "../assets/enemy3.png";
import enemy4Img from "../assets/enemy4.png";

import horizontalTailImg from "../assets/horizontalTail.png"
import horizontalTailReverseImg from "../assets/horizontalTailReverse.png"
import verticalTailImg from "../assets/verticalTail.png"
import verticalTailReverseImg from "../assets/verticalTailReverse.png"
import topRightTailImg from "../assets/topRightTail.png"
import topRightTailReverseImg from "../assets/topRightTailReverse.png"
import topLeftTailImg from "../assets/topLeftTail.png"
import topLeftTailReverseImg from "../assets/topLeftTailReverse.png"
import bottomLeftTailImg from "../assets/bottomLeftTail.png"
import bottomLeftTailReverseImg from "../assets/bottomLeftTailReverse.png"
import bottomRightTailImg from "../assets/bottomRightTail.png"
import bottomRightTailReverseImg from "../assets/bottomRightTailReverse.png"
import tailEndVerticalImg from "../assets/tailEndVertical.png"
import tailEndVerticalReverseImg from "../assets/tailEndVerticalReverse.png"
import tailEndHorizontalImg from "../assets/tailEndHorizontal.png"
import tailEndHorizontalReverseImg from "../assets/tailEndHorizontalReverse.png"

const GAMEBOARD_CELLS_X = 10;
const GAMEBOARD_CELLS_Y = 15;
const INITIAL_GAMEBOARD = Array.from({ length: GAMEBOARD_CELLS_X }, () => Array(GAMEBOARD_CELLS_Y).fill(null));
const INTERVAL_LENGTH = 100;

const combinations = {
    r: { x: 0, y: 1 },
    u: { x: -1, y: 0 },
    l: { x: 0, y: -1 },
    d: { x: 1, y: 0 }
};

const enemiesImages = [enemy1Img, enemy2Img, enemy3Img, enemy4Img]

const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Gameboard({playerPosition, setPlayerPosition, gameState, setGameState}) {
    const [enemyPosition, setEnemyPosition] = useState({ x: 1, y: 1 });
    const [enemyImage, setEnemyImage] = useState(undefined)

    const intervalRef = useRef(null);

    useEffect(() => {
        if(gameState) {
            intervalRef.current = setInterval(() => {
                setPlayerPosition((prevPlayerPosition) => {
                    const newBodyPositions = [...prevPlayerPosition.positions];

                    const newHead = {
                        x: newBodyPositions[0].x + combinations[prevPlayerPosition.direction].x,
                        y: newBodyPositions[0].y + combinations[prevPlayerPosition.direction].y,
                    };

                    if (newHead.x >= GAMEBOARD_CELLS_X || newHead.x < 0 || newHead.y >= GAMEBOARD_CELLS_Y || newHead.y < 0) {
                        setGameState(false);
                    }

                    for (let i = 0; i < playerPosition.positions.length; i++) {
                        if (newHead.x === playerPosition.positions[i].x && newHead.y === playerPosition.positions[i].y) {
                            setGameState(false);
                            break;
                        }
                    }

                    newBodyPositions.unshift(newHead);
                    newBodyPositions.pop();

                    return {
                        ...prevPlayerPosition,
                        positions: newBodyPositions
                    };
                });

            }, INTERVAL_LENGTH);

            return () => clearInterval(intervalRef.current);
        }
    }, [gameState, playerPosition.positions, setGameState, setPlayerPosition]);

    useEffect(() => {
        enemiesImages.forEach((image) => {
            const img = new Image();
            img.src = image;
        });
    }, []);

    useEffect(() => {
        if (playerPosition.positions[0].x === enemyPosition.x && playerPosition.positions[0].y === enemyPosition.y) {
            createEnemy();
        }
    }, [enemyPosition, playerPosition]);

    function createEnemy() {
        let newEnemyPositionX = getRandomNumberInRange(0, GAMEBOARD_CELLS_X - 1);
        let newEnemyPositionY = getRandomNumberInRange(0, GAMEBOARD_CELLS_Y - 1);

        const newPositions = [...playerPosition.positions, { x: newEnemyPositionX, y: newEnemyPositionY }];

        setEnemyImage(enemiesImages[getRandomNumberInRange(0, enemiesImages.length - 1)]);

        setPlayerPosition((prevPlayerPosition) => ({
            ...prevPlayerPosition,
            positions: newPositions
        }));

        setEnemyPosition({
            x: newEnemyPositionX,
            y: newEnemyPositionY
        });
    }

    useEffect(() => {
        createEnemy();
    }, []);

    function getPosition(x,y) {
        return playerPosition.positions.findIndex((element) => JSON.stringify(element) === JSON.stringify({
            x: x,
            y: y,
        }));
    }

    function findTailDirection(x,y) {
        if(playerPosition.positions[getPosition(x,y)+1]) {
            if (playerPosition.positions[getPosition(x, y) - 1] && playerPosition.positions[getPosition(x, y) + 1].x === playerPosition.positions[getPosition(x, y) - 1].x) {
                if(playerPosition.positions[getPosition(x, y) - 1].y > playerPosition.positions[getPosition(x, y) + 1].y) return "horizontalReverse"
                else return "horizontal"
            }
            else if (playerPosition.positions[getPosition(x, y) + 1].y === playerPosition.positions[getPosition(x, y) - 1].y) {
                if(playerPosition.positions[getPosition(x, y) - 1].x > playerPosition.positions[getPosition(x, y) + 1].x) return "verticalReverse"
                else return "vertical"
            }
            else if ((playerPosition.positions[getPosition(x, y) + 1].y + 1 === playerPosition.positions[getPosition(x, y)].y &&
                      playerPosition.positions[getPosition(x, y) + 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                      playerPosition.positions[getPosition(x, y) - 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                      playerPosition.positions[getPosition(x, y) - 1].x - 1  === playerPosition.positions[getPosition(x, y)].x)
            )
                return "topRightReverse";
            else if (playerPosition.positions[getPosition(x, y) - 1].y + 1 === playerPosition.positions[getPosition(x, y)].y &&
                playerPosition.positions[getPosition(x, y) - 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                playerPosition.positions[getPosition(x, y) + 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                playerPosition.positions[getPosition(x, y) + 1].x - 1  === playerPosition.positions[getPosition(x, y)].x)
                return "topRight"
            else if (playerPosition.positions[getPosition(x, y) + 1].y - 1 === playerPosition.positions[getPosition(x, y)].y &&
                      playerPosition.positions[getPosition(x, y) + 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                      playerPosition.positions[getPosition(x, y) - 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                      playerPosition.positions[getPosition(x, y) - 1].x - 1  === playerPosition.positions[getPosition(x, y)].x)
                return "topLeft";
            else if (playerPosition.positions[getPosition(x, y) - 1].y - 1 === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) - 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                    playerPosition.positions[getPosition(x, y) + 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) + 1].x - 1  === playerPosition.positions[getPosition(x, y)].x)
                return "topLeftReverse";
            else if (playerPosition.positions[getPosition(x, y) + 1].y - 1 === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) + 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                    playerPosition.positions[getPosition(x, y) - 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) - 1].x + 1  === playerPosition.positions[getPosition(x, y)].x)
                return "bottomLeftReverse";
            else if (playerPosition.positions[getPosition(x, y) - 1].y - 1 === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) - 1].x  === playerPosition.positions[getPosition(x, y)].x &&
                    playerPosition.positions[getPosition(x, y) + 1].y  === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) + 1].x + 1  === playerPosition.positions[getPosition(x, y)].x)
                return "bottomLeft";
            else if (playerPosition.positions[getPosition(x, y) - 1].y === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) - 1].x + 1  === playerPosition.positions[getPosition(x, y)].x &&
                    playerPosition.positions[getPosition(x, y) + 1].y + 1  === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) + 1].x === playerPosition.positions[getPosition(x, y)].x)
                return "bottomRight";
            else if (playerPosition.positions[getPosition(x, y) + 1].y === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) + 1].x + 1 === playerPosition.positions[getPosition(x, y)].x &&
                    playerPosition.positions[getPosition(x, y) - 1].y + 1 === playerPosition.positions[getPosition(x, y)].y &&
                    playerPosition.positions[getPosition(x, y) - 1].x === playerPosition.positions[getPosition(x, y)].x)
                return "bottomRightReverse";
        }

        if(playerPosition.positions[getPosition(x, y)-1].y === playerPosition.positions[getPosition(x, y)].y) {
            if(playerPosition.positions[getPosition(x, y)-1].x > playerPosition.positions[getPosition(x, y)].x) return "tailEndVerticalReverse";
            else return "tailEndVertical"
        } else {
            if(playerPosition.positions[getPosition(x, y)-1].y > playerPosition.positions[getPosition(x, y)].y) return "tailEndHorizontal";
            else return "tailEndHorizontalReverse"
        }
    }

    return (
        <div id="gameboard">
            {INITIAL_GAMEBOARD.map((row, x) => (
                <div key={x} className="gameboardRow">
                    {row.map((_, y) => (
                        <div key={y} className={"gameboardCell " + (((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)) ? "gameboardCellOdd" : "")}>
                            {playerPosition.positions[0].x === x && playerPosition.positions[0].y === y ? (
                                <img
                                    src={playerImg}
                                    alt="Player"
                                    className={`cellImage player player-${playerPosition.direction || 'r'}`} // Use direction class
                                />
                            ) : playerPosition.positions.some(pos => pos.x === x && pos.y === y) ? (
                                <img className={`cellImage tail`} src={
                                    findTailDirection(x,y) === "horizontal" ? horizontalTailImg :
                                    findTailDirection(x,y) === "horizontalReverse" ? horizontalTailReverseImg :
                                    findTailDirection(x,y) === "vertical" ? verticalTailImg :
                                    findTailDirection(x,y) === "verticalReverse" ? verticalTailReverseImg :
                                    findTailDirection(x,y) === "topRight" ? topRightTailImg :
                                    findTailDirection(x,y) === "topRightReverse" ? topRightTailReverseImg :
                                    findTailDirection(x,y) === "topLeft" ? topLeftTailImg :
                                    findTailDirection(x,y) === "topLeftReverse" ? topLeftTailReverseImg :
                                    findTailDirection(x,y) === "bottomLeft" ? bottomLeftTailImg :
                                    findTailDirection(x,y) === "bottomLeftReverse" ? bottomLeftTailReverseImg :
                                    findTailDirection(x,y) === "bottomRight" ? bottomRightTailImg :
                                    findTailDirection(x,y) === "bottomRightReverse" ? bottomRightTailReverseImg :
                                    findTailDirection(x,y) === "tailEndVertical" ? tailEndVerticalImg :
                                    findTailDirection(x,y) === "tailEndVerticalReverse" ? tailEndVerticalReverseImg :
                                    findTailDirection(x,y) === "tailEndHorizontal" ? tailEndHorizontalImg :
                                    findTailDirection(x,y) === "tailEndHorizontalReverse" ? tailEndHorizontalReverseImg : ""
                                }  alt={"tail"}/>
                            ) : enemyPosition.x === x && enemyPosition.y === y ? (
                                <img src={enemyImage} alt="Enemy" className="cellImage enemy" />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
