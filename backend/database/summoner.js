import SummonerData from "../models/summoner.js";

const summoners = {
  br: {
    brasil: new SummonerData("Brasil", 602, 588, 12, 8),
  },
  na: {
    america: new SummonerData("America", 148, 505, 9, 11),
  },
};

export default summoners;
