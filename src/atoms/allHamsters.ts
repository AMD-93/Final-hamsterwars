import { atom } from "recoil";
import { HamsterModel } from "../models/HamsterModel";

//Gallery State
const allHamsters = atom<HamsterModel[]>({
  key: "allHamsters",
  default: [],
});

export default allHamsters;
