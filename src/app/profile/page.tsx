"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

import Input from "@/components/input/Input";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";
import { removeFromFavorites } from "@/redux/features/favoriteSlice";
import { addToCart } from "@/redux/features/cardSlice";


const FavoriteProducts = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveFromFavorites = (productId: string) => {
        dispatch(removeFromFavorites(productId));
    };

    const handleAddToCart = (product: any) => {
        if (product.source === "mongo") {
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                source: "mongo"
            }));
        } else {
            // api için
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                coverImage: product.coverImage,
                title: product.title || product.name,
                isPriceRange: product.isPriceRange || product.price || 0,
                quantity: 1,
                source: "api"
            }));
        }
    };


    if (favorites.length === 0) {
        return (
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Favorite Products</h3>
                <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-gray-500 text-lg">You dont have any favorite products yet</p>
                    <p className="text-gray-400 text-sm mt-2">Add products you like to favorites to see them here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Favorite Products ({favorites.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-contain"
                            />
                            <div className="absolute top-2 right-0">
                                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                        <p className="text-blue-600 font-bold">${product.price}</p>
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 cursor-pointer bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleRemoveFromFavorites(product.id)}
                                className=" cursor-pointer bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface UserProfile {
    id: string;
    email: string;
    name: string | null;
    surname: string | null;
    phone: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    postalCode: string | null;
    profileImage: string | null;
    bio: string | null;
    profilePercent: number;
    createdAt: string;
    updatedAt: string;
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        profileImage: '',
        bio: ''
    });

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            fetchProfile();
        }
    }, [session, status]);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile/update');
            const data = await response.json();
            if (data.user) {
                setUser(data.user);
                setFormData({
                    name: data.user.name || '',
                    surname: data.user.surname || '',
                    phone: data.user.phone || '',
                    dateOfBirth: data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toISOString().split('T')[0] : '',
                    gender: data.user.gender || '',
                    address: data.user.address || '',
                    city: data.user.city || '',
                    country: data.user.country || '',
                    postalCode: data.user.postalCode || '',
                    profileImage: data.user.profileImage || '',
                    bio: data.user.bio || ''
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.user) {
                setUser(data.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") return <div className="flex justify-center items-center min-h-screen">Loading session...</div>;
    if (!session) return <div className="flex justify-center items-center min-h-screen">You must be logged in to view this page.</div>;
    if (!user) return <div className="flex justify-center items-center min-h-screen">Loading profile data...</div>;

    return (
        <section className="container max-w-screen-lg mx-auto py-10 px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                <div className="flex md:items-center items-start md:flex-row flex-col justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            {(isEditing ? (formData.profileImage || user.profileImage) : user.profileImage) ? (
                                <img
                                    src={isEditing ? (formData.profileImage || user.profileImage || '') : (user.profileImage || '')}
                                    alt={`${user.name || 'User'} ${user.surname || ''}`}
                                    width={100}
                                    height={100}
                                    className="rounded-full border-2 w-20 h-20 border-gray-500 object-cover object-center"
                                />
                            ) : (
                                <div className="w-[100px] h-[100px] rounded-full border-4 border-gray-900 bg-gray-100 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                            {user.profilePercent > 0 && (
                                <div className="absolute -bottom-2 -right-2 borde-2 border-gray-500 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-bold">
                                    {user.profilePercent}%
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">
                                {user.name && user.surname ? `${user.name} ${user.surname}` : 'Complete Your Profile'}
                            </h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">
                                Profile completion: {user.profilePercent}%
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="md:mt-0 mt-5 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${user.profilePercent}%` }}
                    ></div>
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-6">Edit Profile Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="First Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Last Name"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Postal Code"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                        />

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>
                            <ProfileImageUpload
                                currentImageUrl={formData.profileImage}
                                onImageChange={(imageUrl) => setFormData(prev => ({ ...prev, profileImage: imageUrl }))}
                                size="md"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:to-blue-500"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-6">Profile Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">First Name</label>
                            <p className="text-gray-900">{user.name || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Last Name</label>
                            <p className="text-gray-900">{user.surname || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Phone</label>
                            <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                            <p className="text-gray-900">
                                {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Gender</label>
                            <p className="text-gray-900">{user.gender || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Address</label>
                            <p className="text-gray-900">{user.address || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">City</label>
                            <p className="text-gray-900">{user.city || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Country</label>
                            <p className="text-gray-900">{user.country || 'Not provided'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Postal Code</label>
                            <p className="text-gray-900">{user.postalCode || 'Not provided'}</p>
                        </div>
                    </div>

                    {user.bio && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-500 mb-2">Bio</label>
                            <p className="text-gray-900">{user.bio}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                </div>
            </div>

            <FavoriteProducts />
        </section>
    );
}
