import React from 'react';
import './cssFiles/Node.css';

function Node({isStart, isFinish}) {

  return (
    <div className="node" style={{ backgroundColor: isStart ? "#228B22" : isFinish ? "#FF0000":null}}>
    </div>
  );
}

export default Node;
