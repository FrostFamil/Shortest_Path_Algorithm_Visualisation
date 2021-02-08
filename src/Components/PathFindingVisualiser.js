import React, { useState, useEffect } from 'react';
import Node from './Node';

function PathFindingVisualiser() {

  const [nodes, setAllNodes] = useState([])

  useEffect(() => {
    const nodes = [];
    for (let row=0; row < 15; row++) {
        const currentRow = [];
        for(let col=0; col < 50; col++) {
            currentRow.push([]);
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
            <div>
                {row.map((node, nodeIndex) => <Node></Node>)}
            </div>
          )
      })}
    </div>
  );
}

export default PathFindingVisualiser;
