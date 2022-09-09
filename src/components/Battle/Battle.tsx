import { useEffect, useState } from "react";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl, hamsterPics } from "../../utils";
import "./Battle.css";

const Battle = () => {
  const [hamster1, setHamster1] = useState<null | HamsterModel>(null);
  const [hamster2, setHamster2] = useState<null | HamsterModel>(null);
  const [wins, setWins] = useState<null | HamsterModel>(null);
  const [defeats, setDefeats] = useState<null | HamsterModel>(null);
  const [voted1, setVoted1] = useState<boolean>(false);
  const [voted2, setVoted2] = useState<boolean>(false);

  const winningHamster1 = () => {
    if (hamster1 != null) {
      let newWins = hamster1.wins + 1;
      let newGames = hamster1.games + 1;
      let newResult = hamster1.wins - hamster1.defeats;

      const getWins = {
        ...hamster1,
        wins: newWins,
        games: newGames,
        result: newResult,
      };

      setWins(getWins);
      setVoted1(true);

      fetch(fixUrl(`/hamsters/${hamster1.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getWins),
      });
    }

    if (hamster2 != null) {
      let newDefeats = hamster2.defeats + 1;
      let newGames = hamster2.games + 1;
      let newResult = hamster2.wins - hamster2.defeats;

      const getDefeats = {
        ...hamster2,
        defeats: newDefeats,
        games: newGames,
        result: newResult,
      };
      setDefeats(getDefeats);

      fetch(fixUrl(`/hamsters/${hamster2.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getDefeats),
      });
    }
  };

  const winningHamster2 = () => {
    if (hamster2 != null) {
      let newWins = hamster2.wins + 1;
      let newGames = hamster2.games + 1;
      let newResult = hamster2.wins - hamster2.defeats;

      const getWins = {
        ...hamster2,
        wins: newWins,
        games: newGames,
        result: newResult,
      };
      setWins(getWins);
      setVoted2(true);

      fetch(fixUrl(`/hamsters/${hamster2.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getWins),
      });
    }
    if (hamster1 != null) {
      let newDefeats = hamster1.defeats + 1;
      let newGames = hamster1.games + 1;
      let newResult = hamster1.wins - hamster1.defeats;

      const getDefeats = {
        ...hamster1,
        defeats: newDefeats,
        games: newGames,
        result: newResult,
      };
      setDefeats(getDefeats);

      fetch(fixUrl(`/hamsters/${hamster1.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getDefeats),
      });
    }
  };

  const NewBattle = () => {
    setHamster1(null);
    setHamster2(null);
    setWins(null);
    setDefeats(null);
    setVoted1(false);
    setVoted2(false);

    async function getData1() {
      const response: Response = await fetch(fixUrl("/hamsters/random"));
      const apiData: any = await response.json();

      setHamster1(apiData as HamsterModel);
    }
    getData1();

    async function getData2() {
      const response: Response = await fetch(fixUrl("/hamsters/random"));
      const apiData: any = await response.json();

      setHamster2(apiData as HamsterModel);
    }
    getData2();
  };

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/random"));
      const apiData: any = await response.json();

      setHamster1(apiData as HamsterModel);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/random"));
      const apiData: any = await response.json();

      setHamster2(apiData as HamsterModel);
    }
    getData();
  }, []);

  return (
    <div>
      <div className="battle-wrapper">
        {hamster1 && hamster2 ? (
          <div className="hamster-card">
            <img src={hamsterPics(hamster2.imgName)} />
            <h2>{hamster2.name}</h2>
            {voted2 ? (
              <div className="stats">
                <p>Vinster: {wins?.wins} </p>
                <p>Förluster: {wins?.defeats}</p>
                <p>Matcher: {wins?.games}</p>
              </div>
            ) : null}
            {voted1 ? (
              <div className="stats">
                <p>Vinster: {defeats?.wins} </p>
                <p>Förluster: {defeats?.defeats}</p>
                <p>Matcher: {defeats?.games}</p>
              </div>
            ) : null}

            <button disabled={voted1 || voted2} onClick={winningHamster2}>
              Rösta för {hamster2.name}!
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {hamster1 && hamster2 ? (
          <div className="hamster-card">
            <img src={hamsterPics(hamster1.imgName)} />
            <h2>{hamster1.name}</h2>
            {voted1 ? (
              <div className="stats">
                <p>Vinster: {wins?.wins} </p>
                <p>Förluster: {wins?.defeats}</p>
                <p>Matcher: {wins?.games}</p>
              </div>
            ) : null}
            {voted2 ? (
              <div className="stats">
                <p>Vinster: {defeats?.wins} </p>
                <p>Förluster: {defeats?.defeats}</p>
                <p>Matcher: {defeats?.games}</p>
              </div>
            ) : null}

            <button disabled={voted1 || voted2} onClick={winningHamster1}>
              Rösta för {hamster1.name}!
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>

      {wins != null ? (
        <div className="winner">
          <h2>Grattis, {wins.name}!</h2>
          <button onClick={NewBattle}>Ny match</button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default Battle;
