import { FIREBASE_CONFIG_VAR } from "firebase-admin/lib/app/lifecycle";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl, hamsterPics } from "../../utils";
import "./GalleryCard.css";

interface Props {
  hamster: HamsterModel;
}
const GalleryCard = ({ hamster }: Props) => {
  const [, setData] = useRecoilState<HamsterModel[]>(allHamsters);

  const hamsterCard = async () => {
    const response: Response = await fetch(fixUrl(`/hamsters/${hamster.id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
    if (response.status === 200) {
      async function getData() {
        const response: Response = await fetch(fixUrl("/hamsters/"));
        const apiData: any = await response.json();

        setData(apiData as HamsterModel[]);
      }
      getData();
    }
  };
  return (
    <>
      <div className="div-wrapper">
        <div className="pic-age">
          <h3>
            {hamster.name}, {hamster.age}
          </h3>
          <img src={hamsterPics(hamster.imgName)} />
        </div>
        <div className="info">
          <p>
            {hamster.name} älskar att {hamster.loves} och äter helst{" "}
            {hamster.favFood}.
          </p>
          <p>Vinster: {hamster.wins}</p>
          <p>Förluster: {hamster.defeats}</p>
          <p>Matchar: {hamster.games}</p>

          <button onClick={() => hamsterCard()}>Radera ❌ </button>
        </div>
      </div>
    </>
  );
};
export default GalleryCard;
