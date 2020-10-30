import React from 'react';
import Netflix_Logo from "../../assets/img/Netflix_Logo.png"
import Netflix_User from "../../assets/img/Netflix_User.png"
import './style.css';

function Header({blackHeader}) {
  return(
      <header className={blackHeader? 'black': ''}>
          <div className="header--logo">
              <a href="/">
                  <img src={Netflix_Logo} alt="Logo NetFlix"/>
              </a>
          </div>
          <div className="header--user">
              <a href="/">
                  <img src={Netflix_User} alt="User" />
              </a>
          </div>
      </header>
  );
}

export default Header;