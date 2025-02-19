import React, { ReactNode } from 'react'
import Logo from '../components/custom/Logo'

function layout({ children }: { children: ReactNode }) {
  return (
    <div className='relative h-full w-full flex flex-col items-center justify-center'>
      <div className='mt-12'>
        <Logo />
        {children}
      </div>
    </div>
  )
}

export default layout