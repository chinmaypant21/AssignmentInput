import React, { useEffect, useState } from 'react'
import { demoUsers } from 'utils/demoData';

const ValueSelector : React.FC<any> = ({searchValue, setSearchValue, pickedUsers, setPickedUsers, isOpen, ...props}) => {
    
    const [displayUsers, setDisplayUsers] = useState<pickedUserType[]>();
    
    useEffect(() => {
        const unselectedUsers = demoUsers.filter(
            (user) => !pickedUsers.some((pickedUser: any) => pickedUser?.id === user?.id)
        );

        const matchedUsers = unselectedUsers.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()));

        setDisplayUsers(matchedUsers) 
    }, [pickedUsers, searchValue])

    function handleValueSelection(user: pickedUserType) {
        setPickedUsers((prevVal: any) => ([...prevVal, user]))
        setSearchValue('');
    }
        
    if (!isOpen || !displayUsers?.length) return null;

    return (
        <div {...props}>
            <div className='min-w-[15em] flex flex-col gap-1 selector-dropdown bg-white rounded-t-md py-2 max-h-[200px] overflow-y-scroll'>
            {
                displayUsers?.map(user =>
                    <div
                        key={user.id}
                        onClick={() => handleValueSelection(user)}
                        className='flex gap-3 justify-between cursor-pointer px-2 py-1 hover:bg-[#e7e7e7]'
                    >
                        <img src={user.img} alt='profile' className='profile-img' />
                        <span className='mr-auto font-semibold' title={user.name}>{user.name}</span>
                        <span className='text-gray-500'>{user.email}</span>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default ValueSelector