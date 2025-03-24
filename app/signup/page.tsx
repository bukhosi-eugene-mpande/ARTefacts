"use client"
import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import LoginPage, { FloatingBalls } from "@/components/ui/floatingballs"
import logo from "@/public/assets/logo.svg";
import Image from "next/image"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"

export default function Signup() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
  }
  return (
    <div className="max-w-md flex flex-col items-start w-full mx-auto rounded-xl p-4 md:p-8 shadow-input bg-[#2A2725] dark:bg-[#141313] font-garamond">
        <h1 className="mt-2 text-2xl font-bold text-white dark:text-neutral-100">Sign up</h1>
        {/* <Image src={logo} alt="Logo" /> */}

      <form className="mt-2 flex gap-4 flex-col items-start" onSubmit={handleSubmit}>
        {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"> */}
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-white">First name</Label>
            <Input id="firstname" placeholder="Johnny" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-white">Last name</Label>
            <Input id="lastname" placeholder="Appleseed" type="text" />
          </LabelInputContainer>
        {/* </div> */}
        <LabelInputContainer>
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input id="email" placeholder="johnappleseed@gmail.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-[#bd9b73] dark:from-[#614f3b] dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        Have an account? <a href="/login" className="text-[#bd9b73]">Sign in.</a>
        </p> 
        
      {/* make this a footer instead: */}
        
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
      </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col items-start space-y-2 w-full", className)}>{children}</div>
}

