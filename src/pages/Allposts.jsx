import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/configuration";
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)
    
    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.rows || [])
                } else {
                    setPosts([])
                }
            })
        } 
    }, [authStatus])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/3'>
                        
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts