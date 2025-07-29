import React, { ChangeEvent } from 'react'

interface InputProps {
    value: string
    onChange: (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    disabled?: boolean
    type?: string
    label?: string
    name?: string
}


export default function Input({
    value, onChange, disabled, type = "text", label, name
}: InputProps) {
    return (
        <div className="relative w-full">
            <input
                value={value}
                onChange={onChange}
                type={type}
                disabled={disabled}
                name={name}
                required
                placeholder=""
                className="outline-none p-4 border-2 border-neutral-300 w-full rounded-md peer focus:border-neutral-900"
            />
            <label
                className="
                  capitalize
                  absolute
                  left-4
                  top-4
                  text-base
                  pointer-events-none
                  bg-white
                  px-1
                  transition-all
                  duration-200
                  ease-in-out
                  peer-placeholder-shown:top-4
                  peer-placeholder-shown:left-4
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:scale-100
                  peer-focus:-top-2
                  peer-focus:left-3
                  peer-focus:text-xs
                  peer-focus:scale-90
                  peer-focus:bg-white
                  peer-focus:px-1
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:left-3
                  peer-[&:not(:placeholder-shown)]:text-xs
                  peer-[&:not(:placeholder-shown)]:scale-90
                  peer-[&:not(:placeholder-shown)]:bg-white
                  peer-[&:not(:placeholder-shown)]:px-1
                "
            >
                {label}
            </label>
        </div>
    )
}
