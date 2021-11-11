import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    /** if chanceLightsOn=.5 the chance for the lights to be on will be 50% */
    const probabilityFuncLit = (chanceLightsOn) => {
      return !!chanceLightsOn && Math.random() <= chanceLightsOn ? true : false;
    };

    //get a row, fill the sub col spots, repeat
    for (let row = 0; row < nrows; row++) {
      initialBoard.push([]);
      for (let col = 0; col < ncols; col++) {
        initialBoard[row].push(probabilityFuncLit(chanceLightStartsOn));
      }
    }
    
    return initialBoard;
  }

  //future implementation to reduce time complexity; store # of true/falses in array
  //representing on/off in a var, when = to cols*rows return won.

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    
    //if all false in the board => return true
    for(let row of board){
      for(let col of row){
        //if any true in the board return false
        if(col === true) return false
      }
    }

    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => {
        return row.map(col => {
          return col;
        })
      })

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard);//up
      flipCell(y, x+1, newBoard);//right
      flipCell(y-1, x, newBoard);//down
      flipCell(y, x-1, newBoard);//left

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  return ( hasWon(board) ? <div>You WON!</div> :
    <>
      <table className="Board">
        {board.map((row, rowInd) => {
          return (
            <tbody key={`row-${rowInd}`}>
              <tr>
              {
              row.map((col, colInd) => {
                return (
                    <Cell isLit={col} 
                    key={`${rowInd}-${colInd}`} 
                    coord={`${rowInd}-${colInd}`}
                    flipCellsAroundMe={flipCellsAround}/>
                )
              })
              }
              </tr>
            </tbody>
          )
        })}
      </table>
    </>
  )
  // TODO
}

export default Board;
