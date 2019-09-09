import React, { Component } from 'react'

export default class EditBookmarkForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            url: '',
            rating: ''
        }
    }
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
    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
        })
        .then(responseData => {
            const { title, description, url, rating } = responseData
            this.setState({
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
                <form>
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
                            selected={rating}
                            onChange={e => this.handleChangeRating(e.target.value)}
                        >
                            <option value="1" selected={this.state.rating === "1"}>1</option>
                            <option value="2" selected={this.state.rating === "2"}>2</option>
                            <option value="3" selected={this.state.rating === "3"}>3</option>
                            <option value="4" selected={this.state.rating === "4"}>4</option>
                            <option value="5" selected={this.state.rating === "5"}>5</option>
                        </select>
                    </div>
                </form>
            </section>
        )
    }
}