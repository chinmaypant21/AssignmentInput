import React, { useEffect, useRef, useState } from "react"
import Chip from "./Chip"
import ValueSelector from "./ValueSelector"

const InputComponent = () => {
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [pickedUsers, setPickedUsers]           = useState<pickedUserType[]>([]);
    const [isSelectorOpen, setIsSelectorOpen]     = useState<boolean>(false);
    const [backspaceCount, setBackspaceCount]     = useState<number>(0);

    const divRef = useRef<any>(null);

    function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputSearchValue(e.target.value)
    }

    function handleChipRemove(chipId: number){
        return () => {
            setPickedUsers(prevUsers => (
                prevUsers.filter(user => user.id !== chipId)
                ))
                setIsSelectorOpen(false)
        }
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

    useEffect(() => {
        const handleClickOutside = (event: any) => {
        //Handle focus lost from the div to close the selector list
          if (divRef.current && !divRef.current.contains(event.target)) {
            setIsSelectorOpen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        <div className="w-[80%] gap-1 input-container pb-1">
            {
                pickedUsers.map(user => 
                    <React.Fragment key={user.id}>
                        <Chip 
                            data={user}
                            handleChipRemove={handleChipRemove(user.id)}
                            isLastValue={user.id === pickedUsers.at(-1)?.id}
                            isDeleteWarn={(backspaceCount===1)}
                        />
                    </React.Fragment>
                )
            }

            <div
                ref={divRef}
                className="relative" 
            >
                <input
                    placeholder="Add new user..."
                    className="input-box"
                    value={inputSearchValue}
                    onChange={handleSearchValueChange}
                    onKeyDown={handleInputKeyPress}
                    onFocus={()=>{setIsSelectorOpen(true)}}
                    onBlur={()=>setBackspaceCount(0)}
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