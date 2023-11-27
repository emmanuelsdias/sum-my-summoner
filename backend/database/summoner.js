import SummonerData from "../models/summoner.js";

const summoners = {
  br: {
    brasil: new SummonerData("Brasil", 602, 588),
  },
  na: {
    america: new SummonerData("America", 148, 505),
  },
};

export default summoners;
