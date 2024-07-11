import useInfinite from "../hooks/useInfinite"
import { Card } from "@mui/material"

const Articles=()=>{
    const {articles,loaderRef}=useInfinite(4)

     
return(  
    <div className="app">
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
      <div ref={loaderRef} />
      {console.log(articles)}
    </div>
)

}

const ArticlesList = ({ articles }) => {
    return (
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article._id} className="article-card">
            <img src={`https://static01.nyt.com/${article.multimedia[3].url}`} alt={article.headline.main} />
            <h2>{article.headline.main}</h2>
            <p>{article.abstract}</p>
            <a href={article.web_url}>Read more</a>
          </div>
        ))}
      </div>
    );
  };

 
export default Articles
