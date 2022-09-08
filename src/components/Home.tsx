import { useEffect, useState } from "react";
import { HamsterModel } from "../models/HamsterModel";
import { fixUrl, hamsterPics } from "../utils";

const Home = () => {
  const [cutest, setCutest] = useState<HamsterModel[] | null>(null);
  useEffect(() => {
    async function getCutest() {
      try {
        const response: Response = await fetch(fixUrl("/hamsters/cutest"));
        const CutestData: HamsterModel[] = await response.json();
        console.log(CutestData);
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
      <section>
        <main>
          {cutest
            ? cutest.map((hamster) => (
                <section key={Math.random() + hamster.id}>
                  <img src={hamsterPics(hamster.imgName)} alt={hamster.name} />

                  <div>
                    <h2>
                      {hamster.name} is the cutest hamster!
                      <p> Total Wins: {hamster.wins}!</p>{" "}
                    </h2>
                  </div>
                </section>
              ))
            : "Loading..."}
        </main>
      </section>
      <footer></footer>
    </>
  );
};

export default Home;
