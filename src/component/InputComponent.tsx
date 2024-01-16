import React, { useState } from "react"
import Chip from "./Chip"
import ValueSelector from "./ValueSelector"

type pickedUserType = {
    id: number,
    img: string,
    name: string,
    email: string
}

const InputComponent = () => {
    const [inputSearchValue, setInputSearchValue] = useState<any>('');
    const [pickedUsers, setPickedUsers]           = useState<pickedUserType[]>([]);
    const [isSelectorOpen, setIsSelectorOpen]     = useState<boolean>(false);

    function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputSearchValue(e.target.value)
    }

    function handleChipRemove(chipId: number){
        setPickedUsers(prevUsers => (
            prevUsers.filter(user => user.id !== chipId)
        ))
        setIsSelectorOpen(false)
    }

    return (
        <div className="w-[80%] flex gap-1 input-container">
            {
                pickedUsers.map(user => <React.Fragment key={user.id}><Chip data={user} handleChipRemove={()=>handleChipRemove(user.id)}/></React.Fragment>)
            }

            <div className="relative" onBlur={(e)=>{e.stopPropagation(); setIsSelectorOpen(false)}}>
                <input
                    placeholder="Add new user..."
                    className="input-box"
                    value={inputSearchValue}
                    onChange={handleSearchValueChange}
                    onFocus={()=>{setIsSelectorOpen(true)}}
                />
                <ValueSelector
                    isOpen={isSelectorOpen}
                    className='absolute'
                    searchValue={inputSearchValue}
                    setSearchValue={setInputSearchValue}
                    pickedUsers={pickedUsers}
                    setPickedUsers={setPickedUsers}
                />
            </div>
        </div>
  )
}

export default InputComponent