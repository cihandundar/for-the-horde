"use client";

import { useState } from 'react';

interface ProfileImageUploadProps {
    currentImageUrl?: string | null;
    onImageChange: (imageUrl: string) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    alt?: string;
}

export default function ProfileImageUpload({
    currentImageUrl,
    onImageChange,
    size = 'md',
    disabled = false,
    alt = "Profile preview"
}: ProfileImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24'
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        console.log('File selected:', file.name, file.type, file.size);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading file...');
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.imageUrl) {
                console.log('Setting image URL:', data.imageUrl);
                onImageChange(data.imageUrl);
            } else {
                console.error('No imageUrl in response');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                {currentImageUrl ? (
                    <img
                        src={currentImageUrl}
                        alt={alt}
                        className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 object-cover`}
                    />
                ) : (
                    <div className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center`}>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}
                {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                )}
            </div>
            <div className="flex-1">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 cursor-pointer hover:file:bg-purple-100 disabled:opacity-50"
                    disabled={disabled || isUploading}
                />
                <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, GIF up to 5MB
                </p>
            </div>
        </div>
    );
} 