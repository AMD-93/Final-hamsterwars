import { useRecoilState } from "recoil";
import allHams from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl, hamsterPics } from "../../utils";

interface Props {
  hamster: HamsterModel;
}
const HamsterCard = ({ hamster }: Props) => {
  const [, setData] = useRecoilState<HamsterModel[]>(allHams);

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
    <div>
      <div>
        <img src={hamsterPics(hamster.imgName)} />

        <h3>Name: {hamster.name}</h3>
        <p>
          {" "}
          Age: {hamster.age}
          <br />
          Loves: {hamster.loves}
          <br />
          Favorite Food: {hamster.favFood} <br />
          Wins: {hamster.wins}
          <br />
          Defeats: {hamster.defeats}
          <br />
          Matches: {hamster.games}
        </p>

        <button onClick={() => hamsterCard()}>Delete Hamster</button>
      </div>
    </div>
  );
};
export default HamsterCard;
