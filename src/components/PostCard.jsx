import React from 'react'
import appwriteService from '../appwrite/Config'
import { Link } from 'react-router-dom'

const PostCard = ({
    $id,
    title,
    featuredImage,
}) => {
  return (
    <Link to={`/posts/${$id}`}>
        <div className='w-full bg-grey-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className='text-lg font-semibold'> {title} </h2>
        </div>
    </Link>
  )
}

export default PostCard

