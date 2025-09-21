
import { default as Record } from '../assets/record.svg?react';

export default function RecordsPanel() {
    return (
        <nav className="my-[2.5vh] drop-shadow-sm cursor-pointer sticky top-[2.5vh]
        col-span-2 col-start-11 portrait:col-span-5 portrait:col-start-8
        row-span-1 row-start-1 portrait:row-span-1 portrait:row-start-1">
            <div className='rounded-l bg-gray-100 pr-2 flex flex-row'>
                <Record width="32px" fill="#213547" />
                <span className='p-1'>|</span>
                <span className='p-1'>Records</span>
            </div>
        </nav>
    );
}

// bg-rose-400 dark:bg-rose-800