
import { default as Logo } from '../assets/logo.svg?react';

export default function Branding() {
    return (
        <>
        <p className='text-left px-[5%] flex place-items-end
        col-span-3 col-start-2 row-span-1 row-start-5
        portrait:col-span-8 portrait:col-start-3
        portrait:sm:col-span-6 portrait:sm:col-start-4
        portrait:place-items-center 
        portrait:row-span-1 portrait:row-start-4 '>
            Welcome to
        </p>
        <div className="col-span-3 col-start-2 row-span-2 row-start-6 mt-2 portrait:py-5
        portrait:col-span-8 portrait:col-start-3
        portrait:sm:col-span-6 portrait:sm:col-start-4
        portrait:row-span-2 portrait:row-start-5 flex flex-row place-items-center">
            <Logo />
        </div>

        <p className=' text-right px-[5%]
        col-span-3 col-start-2 row-span-1 row-start-8
        portrait:col-span-8 portrait:col-start-3
        portrait:sm:col-span-6 portrait:sm:col-start-4
        portrait:row-span-1 portrait:row-start-7
        flex portrait:place-items-center'>
            <span className='w-full block'>Where plans get solved!</span>
        </p>
        </>
    );
}