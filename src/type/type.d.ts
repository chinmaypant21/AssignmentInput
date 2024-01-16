type pickedUserType = {
    id: number,
    img: string,
    name: string,
    email: string
}

type ChipPropsType = {
    data: pickedUserType,
    handleChipRemove: (number) => void,
    isLastValue: boolean, 
    isDeleteWarn: boolean
}