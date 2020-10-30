import { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Netflix_Loading from "./assets/img/Netflix_Loading.gif"
function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Get list of movies
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Get featured movie
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);
  useEffect(()=>{
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header blackHeader={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
      {movieList.map((item, key) =>(
        <MovieRow key={key} title={item.title} items={item.items} />
        
      ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="heart">💓</span> pela B7web<br/>
        Direitos de imagem para Netflix <br/>
        Dados adquiridos do site TheMovieDB.org
      </footer>

        {movieList.length <=0 &&
          <div className="loading">
            <img src={Netflix_Loading} alt="Loading"/>
          </div>
        }
    </div>
  );
}

export default App;
