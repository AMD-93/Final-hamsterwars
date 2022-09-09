import PostForm from "./PostForm";
import GalleryCard from "./GalleryCard";
import { fixUrl } from "../../utils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";
import "./Gallery.css";

const Gallery = () => {
  const [data, setData] = useRecoilState<HamsterModel[]>(allHamsters);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();

      setData(apiData as HamsterModel[]);
    }
    getData();
  }, []);
  return (
    <div className="outer">
      <div className="hamsters">
        {data
          ? data.map((hamster) => (
              <GalleryCard
                hamster={hamster}
                key={Math.floor(Math.random() * 100) + hamster.id}
              />
            ))
          : "Loading..."}
      </div>
      <div className="form">
        <h3>Registrera din hamster</h3>
        <p>
          Här ska du registrera din hamster. Fyll i alla textfält och ladda up
          bästa bilden på din hamster, sen tryck på knappen nedan. Lycka till!
        </p>
        <PostForm />
      </div>
    </div>
  );
};

export default Gallery;
