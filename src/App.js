import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookmarksContext from './BookmarksContext'
import AddBookmark from './AddBookmark/AddBookmark'
import EditBookmarkForm from './EditBookmark/EditBookmarkForm'
import Rating from './Rating/Rating'
import BookmarkList from './BookmarkList/BookmarkList'
import Nav from './Nav/Nav'
import config from './config'
import './App.css'

// todo ... add a <Route /> for editing a bookmark
// make a component w/ a <form> for editing the item: UpdateBookmarkForm
// add updated method to context & context provider component
   // set initial values for fields in state based on current vals
   // Validate form on submission and perform PATCH request
   // if PATCH is 204, call update method on context
   // implement pdate method to context's data (state) in provider component
class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };



  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm => bm.id !== bookmarkId)
    this.setState({
      bookmarks: newBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
      
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route 
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route 
              exact
              path='/'
              component={BookmarkList}
            />
            <Route 
              path='/edit/:bookmarkId'
              component={EditBookmarkForm}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
