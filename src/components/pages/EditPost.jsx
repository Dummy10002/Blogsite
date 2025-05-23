import React ,{useEffect,useState}from 'react'
import { PostForm,Container } from '../../components'
import { useNavigate,useParams } from 'react-router-dom'
import appwriteService from '../../appwrite/Config'

const EditPost = () => {
    const [post ,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
                    appwriteService.getPost(slug).then((post) => {
            setPost(post)
        })}
        else{
            navigate('/')
        }
    }, [slug,navigate])

  return post ? (    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>):null
}

export default EditPost
