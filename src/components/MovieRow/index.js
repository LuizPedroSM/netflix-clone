import React, {useState} from 'react';

import './style.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function MovieRow({title, items}) {

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let position = scrollX  + Math.round(window.innerWidth * 0.75);
    (position > 0) && (position = 0);
    setScrollX(position);
  }
  const handleRightArrow = () => {
    let position = scrollX - Math.round(window.innerWidth * 0.75);
    let listWidth = items.results.length * 160;
    ((window.innerWidth - listWidth) > position) && (position = window.innerWidth - listWidth - 48);
    setScrollX(position);
  }

  return(
    <div className="movieRow">
        <h2>{title}</h2>
        <div className="movieRow--left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{fontSize:50}} />
        </div>
        <div className="movieRow--right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{fontSize:50}} />
        </div>
        <div className="movieRow--listArea">
          <div className="movieRow--list" style={{
            marginLeft:scrollX,
            width:items.results.length * 160
          }}>
            {items.results.length > 0 && items.results.map((item, key)=>(
              <div key={key} className="movieRow--item">
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
              </div>
              ))}
          </div>        
        </div>
    </div>
  );
}

export default MovieRow;