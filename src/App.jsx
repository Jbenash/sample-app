import Header from './assets/Components/Header'
import Missing from './assets/Components/Missing'
import Nav from './assets/Components/Nav'
import NewPost from './assets/Components/NewPost'
import PostPage from './assets/Components/PostPage'
import Home from './assets/Components/Home'
import About from './assets/Components/About'
import Footer from './assets/Components/Footer'
import { Routes, Route, Link } from 'react-router-dom'
import Post from './assets/Components/Post'
import PostLayout from './assets/Components/PostLayout'
import { useState } from 'react'
import './App.css'
import Feed from './assets/Components/Feed'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "./assets/Components/api/posts"
import EditPost from './assets/Components/EditPost'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedBody, setUpdatedBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)

        }
        else {
          console.log(`Error:${err.message}`)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredresults = posts.filter((post) => (post.body?.toLowerCase()).includes(search.toLowerCase()) ||
      (post.title?.toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredresults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd ,yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)

      }
      else {
        console.log(`Error:${err.message}`)
      }
    }
  }
  const handleUpdate = async (id) => {
    const datetime = format(new Date(), 'MMMM dd ,yyyy pp')
    const updatedPost = { id, title: updatedTitle, datetime, body: updatedBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setUpdatedTitle('')
      setUpdatedBody('')
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)

      }
      else {
        console.log(`Error:${err.message}`)
      }
    }
  }
  const handleDelete = async (id) => {
    try {
      const postsList = posts.filter(post => post.id !== id)
      await api.delete(`/posts/${id}`)
      setPosts(postsList)
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)

      }
      else {
        console.log(`Error:${err.message}`)
      }
    }
  }

  return (
    <div className="App">
      <Header
        title="SampleApp"
      />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        < Route path='/' element={<Home
          posts={searchResults}
        />} />

        <Route path='post' >
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
          } />
          <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />

        </Route>
        <Route path="/edit/:id" element={<EditPost
          posts={posts}
          handleUpdate={handleUpdate}
          updatedBody={updatedBody}
          setUpdatedBody={setUpdatedBody}
          updatedTitle={updatedTitle}
          setUpdatedTitle={setUpdatedTitle}
        />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />


    </div >
  )

}

export default App
