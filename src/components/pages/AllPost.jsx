import React, { useState, useEffect } from 'react'
import { PostCard, Container } from '../../components'
import appwriteService from '../../appwrite/Config'

const AllPost = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        // Move the API call inside useEffect
        appwriteService.getPosts([]).then((posts) => {
            if (posts ) {
                setPosts(posts.documents)
            }
        })
    }, []);
    
    return (
        <div className='py-8'>
            <Container>
                <div className='flex flex-wrap w-full py-8'>
                    {posts.map((posts) => (
                        // Added return statement here
                        <div className='p-2 w-1/4' key={posts.$id}>
                            <PostCard {...posts} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost