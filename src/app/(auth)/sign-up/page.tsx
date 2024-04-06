"use client"

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Page = () => {
    return <>
        <div className="container relative flex pt-20 flex-col items-center justifiy-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm: w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Icons.logo className="h-20 w-20"/>
                    <h1 className="text-2x1 font-bold">
                        Crear cuenta
                    </h1>

                    {/* poner parte de link */}

                    <div className="grid gap-6">
                        <form>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input className={cn({
                                        "focus-visible:ring-red-500": true
                                    })}
                                    placeholder="you@example.com"/>
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input className={cn({
                                        "focus-visible:ring-red-500": true
                                    })}
                                    placeholder="Password"/>
                                </div>
                                <Button>Iniciar sesion</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Page