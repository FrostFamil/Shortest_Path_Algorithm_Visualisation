import React, { useState, useEffect } from 'react';
import Node from './Node';
import {dijkstra, getNodesInShortestPathOrder} from './algorithms/dijkstra';

function PathFindingVisualiser() {

  const [grid, setAllGrid] = useState([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  useEffect(() => {
    const grid = getInitialGrid();
    setAllGrid(grid);
  }, [])

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 18; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === 10 && col === 5,
      isFinish: row === 10 && col === 45,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setAllGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setAllGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  const visualizeDijkstra = () => {
    const startNode = grid[10][5];
    const finishNode = grid[10][45];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }


  return (
    <div>
      <h2>Finding Shortes Path</h2>

      <h4 style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '80px'}}>
        Press any node using mouse to add wall
      </h4>

      <button style={{marginBottom: '20px'}} onClick={() => visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
      </button>

      {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                    const {row, col, isStart, isFinish, isWall} = node
                    return (
                        <Node
                          key={nodeIndex}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={(row, col) => handleMouseDown(row, col)}
                          onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                          onMouseUp={() => handleMouseUp()}
                          row={row}
                        />
                    )
                }
            )}
            </div>
          )
      })}
    </div>
  );
}

export default PathFindingVisualiser;
