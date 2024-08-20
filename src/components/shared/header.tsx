import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Magnet, PersonStanding, PersonStandingIcon, ShoppingCart, User } from 'lucide-react';
import Image from "next/image";
import { Container } from "../shared/container";



interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn("border border-b-2 ", className)}>
            <Container className="flex justify-between items-center py-7 px-2">


               {/* logo block */}
                <div className="flex justify-between gap-4">
                    <picture>
                        <Image 
                            src="/images/шаурма.webp" 
                            width="50" 
                            height="50" 
                            alt="Логотип"
                            className="rounded-full" 
                        />
                    </picture>
                    <div className="flex flex-col">
                        <h1 className="uppercase text-2xl font-black">Твоя шаурма</h1>
                        <p className="text-gray-400 leading-3 text-sm">И только твоя</p>
                    </div>
                </div>

                {/* search block */}
                <div className="search">
                    <Input 
                    placeholder="Поиск по ассортименту ..."

                    />
                </div>

                {/* header button block */}
                <div className="flex justify-between gap-2">
                    <Button variant="outline" className="flex items-center">
                        <User size={16} />
                        <span>Войти</span>
                        </Button>
                    <Button variant="outline" size="icon">
                        <ShoppingCart size={20} />
                    </Button>
                </div>


            </Container>
        </header>
    );
};