import React from "react";
import {cn} from "@/lib/utils";
import { Button } from "../ui";
import { ArrowUpDown } from "lucide-react";

interface Props {
    className?: string,
    categories: string[],
    activeIndex?: number
}

export const Categories: React.FC<Props> = ({ className, categories, activeIndex }) => {
    return (
            <ul className={
                cn(`inline-flex gap-1 bg-gray-50 p-1 rounded-md`
                , className)
                }>
                {
                    categories.map((category, index) => {
                        return <li key={index}>
                                    <a href={`#${category}`}
                                        className={cn("flex items-center font-bold h-11 rounded-md px-5",
                                            activeIndex === index && `shadow-md shadow-gray-400 
                                            text-primary bg-white`
                                        )}
                                    >
                                        <button>{ category }</button>
                                    </a>
                                </li>
                    }) 
                }
            </ul>
    );
};