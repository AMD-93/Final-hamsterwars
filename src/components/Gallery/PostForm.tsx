import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl } from "../../utils";
import "./PostForm.css";

const PostForm = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [favFood, setFavFood] = useState<string>("");
  const [loves, setLoves] = useState<string>("");
  const [imgName, setImgName] = useState<string>("");
  const [data, setData] = useRecoilState<HamsterModel[]>(allHamsters);

  const newHamster: HamsterModel = {
    name: name,
    age: Number(age),
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: 0,
    defeats: 0,
    games: 0,
    result: 0,
    id: "",
  };

  const nameIsValid = newHamster.name !== "";
  const ageIsValid =
    newHamster.age >= 1 && Number.isInteger(newHamster.age) === true;
  const favFoodIsValid = newHamster.favFood !== "";
  const lovesIsValid = newHamster.loves !== "";
  const imgNameIsValid = newHamster.imgName !== "";
  const formIsValid =
    nameIsValid &&
    ageIsValid &&
    favFoodIsValid &&
    lovesIsValid &&
    imgNameIsValid;

  const handleAddHamster = async () => {
    const response: Response = await fetch(fixUrl("/hamsters"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHamster),
    });
    if (response.status === 200) {
      async function getData() {
        const response: Response = await fetch(fixUrl("/hamsters/"));
        const apiData: any = await response.json();

        setData(apiData as HamsterModel[]);
      }
      getData();
    }
    setName("");
    setAge("");
    setFavFood("");
    setLoves("");
    setImgName("");
  };
  function onClickPrevDefault(
    e: FormEvent<HTMLFormElement>,
    data: HamsterModel[]
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <form onSubmit={(e) => onClickPrevDefault(e, data)}>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Ålder"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <input
        type="text"
        placeholder="Favoritmat"
        value={favFood}
        onChange={(event) => setFavFood(event.target.value)}
      />
      <input
        type="text"
        placeholder="Vad älskar den?"
        value={loves}
        onChange={(event) => setLoves(event.target.value)}
      />
      <input
        type="text"
        placeholder="Bild"
        value={imgName}
        onChange={(event) => setImgName(event.target.value)}
      />
      <button disabled={!formIsValid} onClick={handleAddHamster}>
        Registrera ✔️
      </button>
    </form>
  );
};

export default PostForm;
