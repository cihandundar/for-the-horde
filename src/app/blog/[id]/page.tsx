import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import React from 'react'
import { getBlogById } from '@/lib/prismadb' // yukarıdaki fonksiyon

interface Props {
    params: Promise<{ id: string }>
}

export default async function BlogDetail(props: Props) {
    const params = await props.params;
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
