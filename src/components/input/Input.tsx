import React, { ChangeEvent } from 'react'

interface InputProps {
    value: string
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    type?: string
    label?: string
}


export default function Input({
    value, onChange, disabled, type = "text", label
}: InputProps) {
    return (
        <div className="relative w-full">
            <input
                value={value}
                onChange={onChange}
                type={type}
                disabled={disabled}
                className='outline-none p-4 border-2 border-neutral-300 w-full rounded-md peer focus:border-neutral-900'
            />
            <label className='capitalize absolute top-0 left-3 scale-75 peer-focus-within:scale-100 peer-focus-within:top-3 peer-focus-within:bg-white
            peer-focus-within:px-2 px-0 bg-transparent transition-all duration-200 ease-in-out
            '>
                {label}
            </label>
        </div>
    )
}
