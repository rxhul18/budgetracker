"use client";
import React, { useState } from 'react'
import Logo, { LogoMobile } from './Logo'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import ThemeToggle from './ThemeToggle';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

function Navbar() {
    return (
        <>
            <DestokNavbar />
            <MobileNavbar />
        </>
    )
}

const items = [
    { label: "Dashboard", link: "/" },
    { label: "Transactions", link: "/transactions" },
    { label: "Manage", link: "/manage" },
]

function MobileNavbar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="block border-separate bg-background md:hidden">
            <nav className='container flex items-center justify-between px-4 border-b'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"outline"} size={"icon"}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-[85vw] sm:w-[540px]' side={"left"}>
                        <Logo />
                        <div className="flex flex-col gap-1 pt-4">
                            {items.map(item => 
                                <NavbarItem 
                                link={item.link} 
                                label={item.label} 
                                key={item.label} 
                                toClickCallback={() => setIsOpen(prev => !prev)}
                                />)}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4"><LogoMobile /></div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

function DestokNavbar() {
    return (
        <div className='hidden border-separate md:flex justify-center border-b bg-background'>
            <nav className='container flex items-center justify-between px-4'>
                <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
                    <Logo />
                    <div className='flex h-full'>
                        {items.map(item => (
                            <NavbarItem link={item.link} label={item.label} key={item.label} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <SignedIn>
                        {/* <ThemeToggle /> */}
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
            {/* <ThemeToggle /> */}
        </div>
    )
}

function NavbarItem({ link, label, toClickCallback }: { link: string, label: string, toClickCallback?: () => void }) {
    const pathname = usePathname()
    const isActive = pathname === link
    return (
        <div className='relative flex items-center'>
            <Link href={link} className={
                cn(buttonVariants({ variant: "ghost" }),
                    "w-full justify-normal text-lg text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground")}
                    onClick={() => toClickCallback && toClickCallback()}
            >{label}</Link>
            {isActive && (
                <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
            )}
        </div>
    )
}

export default Navbar