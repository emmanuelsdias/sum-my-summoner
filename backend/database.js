import AccountData from "./models.js";

const database = {
  br: {
    brasil: new AccountData("Brasil", 602, 588),
  },
  na: {
    america: new AccountData("America", 148, 505),
  },
};

export default database;
