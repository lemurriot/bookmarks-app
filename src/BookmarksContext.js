import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    deleteBookmark: () => {},
    addBookmark: () => {},
})

export default BookmarksContext