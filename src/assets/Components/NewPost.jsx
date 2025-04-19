import React from 'react'

const NewPost = ({ handleSubmit, PostTitle, setPostTitle, PostBody, setPostBody }) => {
    return (
        <main className='NewPost'>
            <h2>New Post </h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor='postTitle'> Title:</label>
                <input type="text" id='postTitle'
                    required
                    value={PostTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='postBody'> Post:</label>
                <textarea type="text" id='postBody'
                    required
                    value={PostBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type='submit'>Submit data</button>
            </form>
        </main>
    )
}

export default NewPost
