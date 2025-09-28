
import { useState } from 'react';
import { default as Record } from '../assets/record.svg?react';

export default function RecordsToggler({ tab, toSolve }) {
    const setTab = (tabName) => {
        tab(tabName);
    }

    return (
        <nav className="my-[2.5vh] drop-shadow-sm cursor-pointer sticky top-[2.5vh]
        col-span-2 col-start-11 portrait:col-span-5 portrait:col-start-8
        row-span-1 row-start-1 portrait:row-span-1 portrait:row-start-1">
            <div className='rounded-l bg-gray-100 pr-2 flex flex-row
            dark:bg-[#242424] dark:border dark:border-white dark:border-r-transparent'
            onClick={() => setTab("Records") }>
                {toSolve ? (
                    <Record width="32px" className="animate-spin min-w-[20px] fill-[#213547] dark:fill-[#999999]" />
                ) : (
                    <Record width="32px" className="min-w-[20px] fill-[#213547] dark:fill-[#999999]" />
                )}
                <span className='p-1'>|</span>
                {!toSolve ? (
                    <span className='p-1'>Records</span>
                ) : ( 
                    <span className='p-1'>Recording...</span>
                )}
            </div>
        </nav>
    );
}

// bg-rose-400 dark:bg-rose-800