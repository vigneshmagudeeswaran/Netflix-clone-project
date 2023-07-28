import { signOut } from 'next-auth/react'
import React from 'react'

interface AccountMenuProps {
    visible ?: Boolean;
}
const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    {
        if (!visible) {
            return null;
    }}
    return (
        <div className = 'bg-black w-56 absolte top-14 right-0 py-5 flex-col border'>
            <div className='flex flex-col gap-3'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src='/images/default-blue.png' alt='' />
                    <p className ='text-white text-5m group-hover/item:underline'>Username</p>
                </div></div>  
      </div>)
}

export default AccountMenu;