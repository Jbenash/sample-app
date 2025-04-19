import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPost = ({
  posts, handleUpdate, updatedBody, setUpdatedBody, updatedTitle, setUpdatedTitle
}) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if (post) {
      setUpdatedTitle(post.title)
      setUpdatedBody(post.body)

    }
  }, [post, setUpdatedTitle, setUpdatedBody])

  return (
    <main className='NewPost'>
      {updatedTitle &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) =>
            e.preventDefault()}>

            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={updatedBody}
              onChange={(e) => setUpdatedBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleUpdate(post.id)}>Update Post</button>
          </form>
        </>}
      {!updatedTitle &&
        <p>Post not found or still loading...</p>
      }
    </main>
  )
}

export default EditPost
