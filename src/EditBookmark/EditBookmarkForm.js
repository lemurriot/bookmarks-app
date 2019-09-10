import React, { Component } from 'react'
import BookmarksContext from '../BookmarksContext'
import config from '../config'

export default class EditBookmarkForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            url: '',
            rating: '',
            error: null
        }
    }
    static contextType = BookmarksContext

    handleChangeTitle = (newVal) => {
        this.setState({
            title: newVal
        })
    }
    handleChangeDescription = (newVal) => {
        this.setState({
            description: newVal
        })
    }
    handleChangeUrl = (newVal) => {
        this.setState({
            url: newVal
        })
    }
    handleChangeRating = (newVal) => {
        this.setState({
            rating: newVal
        })
    }
    resetFields = (newFields) => {
        this.setState({
          id: newFields.id || '',
          title: newFields.title || '',
          url: newFields.url || '',
          description: newFields.description || '',
          rating: newFields.rating || '',
        })
      }
    handleFormSubmit = e => {
        e.preventDefault()
        const bookmarkId = this.props.match.params.bookmarkId
        const { title, description, url, rating, id } = this.state
        const requiredFields = [title, url, rating]
        requiredFields.forEach(field => {
            if (!field){
                this.setState({
                    error: `${field} field is required`
                })
                return
            }
        })
        const updatedBookmark = {
            id,
            title,
            description,
            url,
            rating: Number(rating),
        }
        console.log(JSON.stringify(updatedBookmark))
        fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedBookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            console.log(res)
            if (!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
        })
        .then(data => {
            this.resetFields(updatedBookmark)
            this.context.updateBookmark(updatedBookmark)
            this.props.history.push('/')
        })
    }
    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
        })
        .then(responseData => {
            const { title, description, url, rating, id } = responseData
            this.setState({
                id,
                title,
                description,
                url,
                rating: String(rating)
            })
        })
    }
    render(){
        const { title, description, url, rating } = this.state
        return (
            <section className="EditBookmarkForm">
                <h2>Edit article</h2>
                <form onSubmit={e => this.handleFormSubmit(e)}>
                    <div>
                        <label htmlFor="bookmark-title">
                            Title
                        </label>
                        <input 
                            type="text" 
                            id="bookmark-title"
                            name="bookmark-title"
                            required
                            value={title}   
                            onChange={e => this.handleChangeTitle(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="bookmark-description">
                            Description
                        </label>
                        <textarea 
                            type="text" 
                            id="bookmark-description"
                            name="bookmark-description"
                            value={description}
                            onChange={e => this.handleChangeDescription(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="bookmark-url">
                            URL
                        </label>
                        <input 
                            type="text" 
                            id="bookmark-url"
                            name="bookmark-url"
                            value={url}
                            onChange={e => this.handleChangeUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="bookmark-rating">
                            Rating
                        </label>
                        <select 
                            name="bookmark-rating" 
                            id="bookmark-rating"
                            value={this.state.rating}
                            onChange={e => this.handleChangeRating(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        )
    }
}