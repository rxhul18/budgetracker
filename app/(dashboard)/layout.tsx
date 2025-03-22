import Navbar from '@/components/custom/Navbar'
import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex flex-col justify-start h-screen w-full'>
        <div className='w-full'>
           <Navbar />
            {children}
        </div>
    </div>
  )
}

export default layout