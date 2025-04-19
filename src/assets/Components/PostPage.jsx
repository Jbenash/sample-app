import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Button from './DeleteButton'

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams()
    const post = posts.find((post) => (post.id).toString() === id)

    return (
        <main className='PostPage'>
            <article className='post'>
                {post &&

                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`} >
                            <button
                                className='editButton'
                            >
                                Edit Post
                            </button>
                        </Link>

                        <Button
                            onDelete={() => { handleDelete(post.id) }} />


                    </>

                }
                {
                    !post &&
                    <>
                        <h1>404</h1>
                        <h2>Page Not Found</h2>
                        <Link to='/'>Visit our Homepage</Link>
                    </>
                }
            </article>
        </main>




    )
}

export default PostPage

