import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      surname,
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      country,
      postalCode,
      profileImage,
      bio
    } = body;

    // Calculate profile completion percentage
    const profileFields = [
      name, surname, phone, dateOfBirth, gender, 
      address, city, country, postalCode, profileImage, bio
    ];
    const filledFields = profileFields.filter(field => field && field !== '').length;
    const profilePercent = Math.round((filledFields / profileFields.length) * 100);

    const updatedUser = await prismadb.user.update({
      where: { email: session.user.email },
      data: {
        name,
        surname,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        address,
        city,
        country,
        postalCode,
        profileImage,
        bio,
        profilePercent,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        surname: updatedUser.surname,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        address: updatedUser.address,
        city: updatedUser.city,
        country: updatedUser.country,
        postalCode: updatedUser.postalCode,
        profileImage: updatedUser.profileImage,
        bio: updatedUser.bio,
        profilePercent: updatedUser.profilePercent
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phone: true,
        dateOfBirth: true,
        gender: true,
        address: true,
        city: true,
        country: true,
        postalCode: true,
        profileImage: true,
        bio: true,
        profilePercent: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Profile get error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 