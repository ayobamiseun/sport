import React, { Component } from 'react';
class Ball extends Component {
  state = {
    leagues: [
        { id: 2002, name: 'Bundesliga', flag: 'https://crests.football-data.org/BL1.png' },
        { id: 2014, name: 'Primera Division', flag: 'https://crests.football-data.org/760.svg'},
        { id: 2015, name: 'Ligue 1', flag: 'https://crests.football-data.org/773.svg' },
        { id: 2019, name: 'Serie A', flag: 'https://crests.football-data.org/784.svg' },
        { id: 2021, name: 'Premier League', flag: 'https://crests.football-data.org/770.svg' },
        {id: 2016, name: 'Championship', flag: 'https://crests.football-data.org/ELC.png'}
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
        return(
          
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
              <small className="text-muted">hello</small>

              <div />
            </div>
            </button></div></div>))}
            </div>
            </div>
            </div>
            </div>
        )
    }
};

export default Ball;
