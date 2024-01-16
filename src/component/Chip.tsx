import React from 'react'

const Chip : React.FC<{data: any, handleChipRemove: any, isLastValue: boolean, isDeleteWarn: boolean}> = ({data, handleChipRemove, isLastValue, isDeleteWarn}) => {

    return (
        <div className={`flex items-center gap-2 rounded-2xl bg-slate-300 pr-2 border-2 ${(isDeleteWarn && isLastValue) ? 'border-blue-600' : 'border-transparent'}`}>
          <img className='profile-img' src={data.img} />
          <span className='w-[90px] text-sm font-semibold chip-name text-gray-600'>{data.name}</span>
          <span className='hover:bg-slate-400 rounded-2xl px-1 cursor-pointer' onClick={handleChipRemove}>✖</span>
        </div>
    )
}

export default Chip