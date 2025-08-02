import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import React from 'react'
import { getBlogById } from '@/lib/prismadb' // yukarıdaki fonksiyon

interface Props {
    params: { id: string }
}

export default async function BlogDetail({ params }: Props) {
    const blog = await getBlogById(params.id);

    if (!blog) return <div>Blog not found</div>;

    return (
        <>
            <Breadcrumb title={blog.title} />
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </>
    )
}
