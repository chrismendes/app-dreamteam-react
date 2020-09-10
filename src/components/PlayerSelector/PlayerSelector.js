import React, { useState, useContext } from 'react';
import TodoTabs from '../common/TodoTabs';
import SelectableCard from '../common/SelectableCard';
import UserTeamContext from '../../context/UserContext';
import playerCatalogue from '../../data/players.json';
import './PlayerSelector.scss';

const PlayerSelector = () => {

  const getPlayersByPosition = (position) => {
    return playerCatalogue.filter(player => player.position === position);
  };

  const [activeCategory, setActiveCategory] = useState('GK');
  const [activeCategoryPlayers, setActiveCategoryPlayers] = useState(getPlayersByPosition(activeCategory));
  const [userTeamState, setUserTeamState] = useContext(UserTeamContext);

  const changeCategory = (category) => {
    let players = getPlayersByPosition(category);
    setActiveCategory(category);
    setActiveCategoryPlayers(players);
  };

  const togglePlayer = (playerID) => {

  };

  return (
    <div className="playerselector" data-testid="PlayerSelector">

      <TodoTabs tabs={[
        { id: 'GK',  label: `Goalkeepers (0/${userTeamState.formation.places[0]})` },
        { id: 'DEF', label: `Defenders (0/${userTeamState.formation.places[1]})` },
        { id: 'MID', label: `Midfielders (0/${userTeamState.formation.places[2]})` },
        { id: 'FWD', label: `Forwards (0/${userTeamState.formation.places[3]})` },
      ]} updateFn={changeCategory} />

      <div className="flex two three-600 six-1200">

        {activeCategoryPlayers.map((p, i) => 
          <div key={"p" + i}>
            <SelectableCard title={p.name} description={p.club} image={p.photo} id={p.id} updateFn={togglePlayer} />
          </div>
        )}

      </div>

    </div>
  );
};

export default PlayerSelector;