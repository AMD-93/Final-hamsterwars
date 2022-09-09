import { useEffect, useState } from "react";
import { HamsterModel } from "../models/HamsterModel";
import { fixUrl, hamsterPics } from "../utils";
import "./Home.css";

const Home = () => {
  const [cutest, setCutest] = useState<HamsterModel[] | null>(null);
  useEffect(() => {
    async function getCutest() {
      try {
        const response: Response = await fetch(fixUrl("/hamsters/cutest"));
        const CutestData: HamsterModel[] = await response.json();
        if (CutestData.length > 1) {
          const randomCutest = [];
          randomCutest.push(
            CutestData[Math.floor(Math.random() * CutestData.length)]
          );
          setCutest(randomCutest);
          return;
        } else {
          setCutest(CutestData);
        }
      } catch (error) {
        return error;
      }
    }
    getCutest();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="welcome">
          <h2>Välkommen till HamsterWars!</h2>
          <p>
            HamsterWars är en webbplats där matcher mellan två hamstrar slumpas
            fram och du väljer den du tycker är sötast. Här till höger ser du
            vilken hamster har vunnit flest tävlingar.
          </p>
          <p>
            Vill du delta? Då kan du navigera till Tävling och rösta där! Trycka
            på knappen som tillhör hamstern du tycker är sötast.
          </p>
          <p>
            {" "}
            Kanske har du en hamster som du tycker är ännu sötare än alla andra
            som redan finns? Då kan du anmäla den och se om det stämmer!
            Navigera till Galleri och följ instruktionerna!
          </p>
        </div>
        {cutest
          ? cutest.map((hamster) => (
              <section key={Math.random() + hamster.id} className="card">
                <h2>Vinnaren</h2>
                <img src={hamsterPics(hamster.imgName)} alt={hamster.name} />
                <h3>Grattis, {hamster.name}!</h3>
                <div className="card-text">
                  <p>
                    {hamster.name} är den sötaste hamstern just nu! Den här
                    lilla {hamster.age} år gammal sötnos har vunnit{" "}
                    {hamster.wins} tävlingar än så länge. Den älskar att{" "}
                    {hamster.loves} och äter helst {hamster.favFood}.
                  </p>
                </div>
              </section>
            ))
          : "Loading..."}
      </div>
    </>
  );
};

export default Home;
