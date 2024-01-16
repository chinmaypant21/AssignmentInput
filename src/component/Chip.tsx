import React from 'react'

const Chip : React.FC<{data: any, handleChipRemove: any}> = ({data, handleChipRemove}) => {

    return (
        <div>
          <span>{data.name}</span>
          <span onClick={handleChipRemove}>X</span>
        </div>
    )
}

export default Chip