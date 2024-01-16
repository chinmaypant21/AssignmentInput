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
    const [backspaceCount, setBackspaceCount]     = useState<number>(0);

    function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputSearchValue(e.target.value)
    }

    function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.stopPropagation();
        setBackspaceCount(0);
    }

    function handleChipRemove(chipId: number){
        setPickedUsers(prevUsers => (
            prevUsers.filter(user => user.id !== chipId)
        ))
        setIsSelectorOpen(false)
    }

    function handleInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === 'Backspace' && inputSearchValue === '') {
            if (backspaceCount === 0){
                setBackspaceCount((prevCount) => prevCount+1);
            }
            else if(backspaceCount === 1) {
                setPickedUsers(prevUsers => prevUsers.slice(0,-1))
                setBackspaceCount(0);
            }
        }

        else {
            setBackspaceCount(0)
        }
    }

    return (
        <div className="w-[80%] flex gap-1 input-container pb-1">
            {
                pickedUsers.map(user => 
                    <React.Fragment key={user.id}>
                        <Chip 
                            data={user} 
                            handleChipRemove={()=>handleChipRemove(user.id)}
                            isLastValue={user.id === pickedUsers.at(-1)?.id}
                            isDeleteWarn={(backspaceCount===1)}
                        />
                    </React.Fragment>
                )
            }

            <div 
                className="relative w-full" 
                onBlur={(e)=>{e.stopPropagation(); setIsSelectorOpen(false)}}
            >
                <input
                    placeholder="Add new user..."
                    className="input-box"
                    value={inputSearchValue}
                    onChange={handleSearchValueChange}
                    onKeyDown={handleInputKeyPress}
                    onFocus={()=>{setIsSelectorOpen(true)}}
                    onBlur={(e) => handleInputBlur(e)}
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