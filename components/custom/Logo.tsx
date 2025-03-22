import { PiggyBank } from 'lucide-react'
import React from 'react'

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="/" className='flex justify-center items-center gap-2 py-5'>
      <PiggyBank className="h-11 w-11 stroke stroke-amber-500 stroke-[1.5]" />
      <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
        Budget Tracker
      </p>
    </a>
  )
}

export function LogoMobile() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="/" className='flex justify-center items-center gap-2 py-5'>
      <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
        Budget Tracker
      </p>
    </a>
  )
}

export default Logo