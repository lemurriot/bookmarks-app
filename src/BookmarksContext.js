import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    deleteBookmark: () => {},
    addBookmark: () => {},
    updateBookmark: () => {},
})

export default BookmarksContext