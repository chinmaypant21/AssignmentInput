import React, { useEffect, useState } from 'react'

type pickedUserType = {
    id: number,
    img: string | null,
    name: string,
    email: string
}

const demoUsers : pickedUserType[] = [
    {id: 1, img: null, name: 'A1', email: 'ssdf@sff.s'},
    {id: 2, img: null, name: 'A2', email: 'asfs@sff.s'},
    {id: 3, img: null, name: 'A3', email: 'jghf@sff.s'},
    {id: 4, img: null, name: 'A4', email: 'fd@sff.s'},
    {id: 5, img: null, name: 'A5', email: 'fd@sff.s'},
    {id: 6, img: null, name: 'A6', email: 'fd@sff.s'},
    {id: 7, img: null, name: 'A7', email: 'fd@sff.s'},
    {id: 8, img: null, name: 'A8', email: 'fd@sff.s'},
]

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
        // setSearchValue('');
    }
        
    if (!isOpen || !displayUsers?.length) return null;

    else return (
        <div {...props}>
            <div className='w-[15em] selector-dropdown bg-white rounded-t-sm py-2'>
            {
                displayUsers?.map(user =>
                    <div
                        key={user.id}
                        onClick={() => handleValueSelection(user)}
                        className='flex justify-between cursor-pointer px-2 hover:bg-[#e7e7e7]'
                    >
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default ValueSelector