import React, { useState, useEffect } from 'react';
import Node from './Node';

function PathFindingVisualiser() {

  const [nodes, setAllNodes] = useState([])

  useEffect(() => {
    const nodes = [];
    for (let row=0; row < 20; row++) {
        const currentRow = [];
        for(let col=0; col < 50; col++) {
            const currentNode = {
                col,
                row,
                isStart: row === 10 && col === 5,
                isFinish: row === 10 && col === 45
            }
            currentRow.push(currentNode);
        }
        nodes.push(currentRow);
    }
    setAllNodes(nodes);
  }, [])


  return (
    <div>
      <h2>Finding Shortes Path</h2>
      {nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                    const {isStart, isFinish} = node
                    return (
                        <Node
                            key={nodeIndex}
                            isStart={isStart}
                            isFinish={isFinish}
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
