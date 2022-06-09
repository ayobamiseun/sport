import React, { Component } from 'react';
import './App.css';
import Standing from './components/Standings';
// import Ball from './components/Balls';
// import Background from './components/Backgrounds';
import Header from './components/Headers';

class App extends Component {

    state = {
        leagues: [
            {id: 2016, name: 'Championship', flag: 'https://crests.football-data.org/ELC.png', cont: 'England'},
            { id: 2002, name: 'Bundesliga', flag: 'https://crests.football-data.org/BL1.png', cont: 'Germany' },
            { id: 2014, name: 'Primera Division', flag: 'https://crests.football-data.org/PD.png', cont: 'Spain' },
            { id: 2015, name: 'Ligue 1', flag: 'https://crests.football-data.org/FL1.png', cont: 'France'  },
            { id: 2019, name: 'Serie A', flag: 'https://crests.football-data.org/SA.png', cont: 'Italy'  },
            { id: 2021, name: 'Premier League', flag: 'https://crests.football-data.org/PL.png', cont: 'England'  },


            { id: 2014, name: 'Ligue 2', flag: 'https://crests.football-data.org/FL2.png', cont: 'France' },
            { id: 2015, name: 'DFB-Pokal', flag: 'https://crests.football-data.org/DFB_CUP.png', cont: 'Germany'  },
            { id: 2019, name: 'Serie B', flag: 'https://crests.football-data.org/SB.png', cont: 'Italy'  },
            { id: 2021, name: 'Primeira Liga', flag: 'https://crests.football-data.org/PPL.png', cont: 'Portugal'  }
            
        ],
        standings: [],
        selectedLeague: ''
    }

    handleSelection = (id, name) => {
        this.fetchData(id, name);
    };

    fetchData(id, name) {
        const Token = '9d9faecfec584acea7426a69594c7e6b',
        URL = 'https://api.football-data.org/v2/competitions/' + id + '/standings';

        fetch(URL, { headers: { 'X-Auth-Token': Token } })
            .then((response) => response.json())
            .then((response) => {
                const rows = [];
                response.standings[0].table.map(
                    (item, index) => {
                        const { position, playedGames, won, draw, lost, goalsFor, goalsAgainst, goalDifference, points, team } = item;
                      
                        return (
                            rows.push(
                                { position: position, playedGames: playedGames, won: won, draw: draw, lost: lost, goalsFor: goalsFor, goalsAgainst: goalsAgainst, goalDifference: goalDifference, points: points, team: team.name, badge: team.crestUrl }
                            )
                        )
                    }
                )
                this.setState({ standings: [...rows] })
                this.setState({ selectedLeague: name})
        })
            
    }
    
    render() {
        
        const content = this.state.standings;
        let table;

        if (content.length > 0) {
            table = <thead><tr><td colSpan="9"><h3>{this.state.selectedLeague}</h3></td></tr><tr><th className="position">#</th><th className="team" colSpan="2">Team</th><th className="played">Played</th><th className="won">Won</th><th className="draw">Draw</th><th className="lost">Lost</th><th className="ga">GA</th><th className="points">Points</th></tr></thead>;
        }

        return (
            <div className="App">
            
            <Header></Header>
             
          <div className="text-center" >
          
          <div className="row d-flex justify-content-center">
         
          <div className="ball "> 
          <div className="fhead"><strong>All Competitions</strong></div>
             <div className="row">
             
             
           {this.state.leagues.map(league =>(<div className="bo"> <div className="col-6"><button key={league.id} onClick={() => {this.handleSelection(league.id, league.name)}} className="btt mb-3 d-flex align-items-center">
           <img height="80" src={league.flag} alt={league.flag} />
           <div className="pl-3">
             <h2 className="mb-2 h6 font-weight-bold">
               
                 {league.name}
              
             </h2>

             <div className="card-text text-muted small"></div>
             <small className="text-muted">{league.cont}</small>

             <div />
           </div>
           </button></div></div>))}
           </div>
           </div>
           </div>
           </div>
                <div className="container-fluid"> 
                
                <div className="row">
          {/* {this.state.leagues.map(league =>(<div className="col-6"><button className="btt">
            <img height="80" src={league.flag} alt={league.flag} />
            <div className="pl-3">
              <h2 className="mb-2 h6 font-weight-bold">
                <a className="text-dark" href="./article.html">
                  {league.name}
                </a>
              </h2>

              <div className="card-text text-muted small">Read more.....</div>
              <small className="text-muted">hello</small>

              <div />
            </div>
            </button></div>))}
         */}
       {/* <Background>  </Background> */}
         
         

                        {/* <div className="col-lg-4 text-center mt-2">
                        <div className="white">
                        {this.state.leagues.map(league => (
                            <button className="btn btn-primary mr-2 mt-2" key={league.id} onClick={() => {this.handleSelection(league.id, league.name)}}>{league.name}</button>
                        ))}
                        </div>
                        
                        </div> */}
                    </div>
                
                    <div className="table-responsive mt-5">
                        <table className="table">
                            {table}
                            <tbody>
                            {this.state.standings.map(standing => (
                                <Standing
                                    key={standing.position}
                                    position={standing.position}
                                    badge={standing.badge}
                                    team={standing.team}
                                    played={standing.playedGames}
                                    won={standing.won}
                                    draw={standing.draw}
                                    lost={standing.lost}
                                    ga={standing.goalDifference}
                                    points={standing.points}
                                >
                                </Standing>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
