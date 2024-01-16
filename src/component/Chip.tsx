import React from 'react'

const Chip : React.FC<ChipPropsType> = ({data, handleChipRemove, isLastValue, isDeleteWarn}) => {
  return (
      <div 
        className={`chip flex items-center gap-2 rounded-2xl bg-slate-300 pr-2 border-2 
          ${(isDeleteWarn && isLastValue) ? 'border-blue-600' : 'border-transparent'}
        `}
      >
        <img 
          src={data.img} 
          className='profile-img' 
          alt='profile img' 
        />

        <span className='text-sm font-semibold chip-name text-gray-600'>{data.name}</span>

        <span className='hover:bg-slate-400 rounded-2xl px-1 cursor-pointer' onClick={handleChipRemove}>✖</span>
      </div>
  )
}

export default Chip