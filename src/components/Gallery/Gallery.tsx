import PostForm from "./PostForm";
import GalleryCard from "./GalleryCard";
import { fixUrl, hamsterPics } from "../../utils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";

const Gallery = () => {
  const [data, setData] = useRecoilState<HamsterModel[]>(allHamsters);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();

      setData(apiData as HamsterModel[]);
    }
    getData();
    console.log(data);
  }, []);
  return (
    <div>
      <header>
        <h3>Fill in all the info to add your own hamster to our collection </h3>

        <button onClick={() => setToggle(!toggle)}>
          Click Her To Add A New Hamster
        </button>
        {toggle && <PostForm />}
      </header>
      <main>
        <div>
          {data
            ? data.map((hamster) => (
                <GalleryCard
                  hamster={hamster}
                  key={Math.floor(Math.random() * 100) + hamster.id}
                />
              ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
