import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'

function News(props) {
    let [articles, setArticles] = useState(() => { return [] })
    let [loading, setLoading] = useState(() => false)
    let [number_of_articles, setNumber_of_articles] = useState(() => { return 12 })

    useEffect(() => {
        const updateNews = async () => {
            console.log("this.props.searchUrl: ", props.searchUrl, " inside news.js ")
            if ((props.searchUrl) === null) {
                setLoading(true)
                let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=d16597cdb40841e88f3ff8025f53224a&pageSize=${number_of_articles}`
                let data = await fetch(url)
                let parsedData = await data.json()
                setArticles(parsedData.articles)
                setLoading(false)
            }
            //below code will show news that are searched by user
            else {
                setLoading(true)
                let url = (`${props.searchUrl}&pageSize=${number_of_articles}`)
                let data = await fetch(url)
                let parsedData = await data.json()
                setArticles(parsedData.articles)
                setLoading(false)
            }
        }
        updateNews()
    }, [])

    const scroll_to_top = () => {
        window.scrollTo(0, 0)
    }

    const loadMore = async () => {
        if ((props.searchUrl) === null) {
            setNumber_of_articles(number_of_articles + 12)
            setLoading(true)
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=d16597cdb40841e88f3ff8025f53224a&pageSize=${number_of_articles}`
            let data = await fetch(url)
            let parsedData = await data.json()
            setArticles(parsedData.articles)
            setLoading(false)
        }
        else {
            setNumber_of_articles(number_of_articles + 12)
            setLoading(true)
            let url = (`${props.searchUrl}&pageSize=${number_of_articles}`)
            let data = await fetch(url)
            let parsedData = await data.json()
            setArticles(parsedData.articles)
            setLoading(false)
        }
    }

    let null_image = 'https://nextjsdev.com/content/images/2021/11/news.png'
    let default_title = "Quo, rem, aliquid maxime itaque commodi cumque asperiores eveniet porro ratione fuga placeat..."
    let default_desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, rem, aliquid maxime itaque commodi cumque asperiores eveniet porro ratione fuga placeat optio modi qui. A sunt officiis..."

    return (
        <div className="containerOfNewsContainer">
            <h1>Top Headlines</h1>
            <div className='newsContainer'>
                {articles.map((element) => {
                    return (
                        <div key={element.url}>
                            <NewsItems
                                img={element.urlToImage != null ? element.urlToImage : null_image}
                                title={element.title != null ? element.title.slice(0, 96) + "..." : default_title}
                                description={element.description != null ? element.description.slice(0, 190) + "..." : default_desc}
                                newsUrl={element.url} />
                        </div>
                    )
                })}
            </div>
            <div className="btnContainer">
                <button type="button" onClick={scroll_to_top}>Scroll to top</button>
                <div className="loadingbtn_and_LoadMore">
                    {/* (loading &&) it means below div will be shown only if loading will be True*/}
                    {loading &&
                        <div id='loadingDiv'>
                            <div id="circle"></div>
                        </div>}
                    <button type="button" onClick={loadMore}>Load More</button>
                </div>
            </div>
        </div>
    )
}

News.defaultProps = {
    category: "india",
    searchUrl: null
}
News.propTypes = {
    category: PropTypes.string,
}

export default News
