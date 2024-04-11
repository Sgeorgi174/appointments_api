const obj = {
  id: 1,
  botToken: "6705604485:AAHrf7J4buGKEh_1gVeTp3rRasbt0oQygAs",
  botName: "Дмитрий",
  address: "Пушкина78",
  imgUrl: "\\uploads\\1\\1712802995812-Screenshot_1.jpg",
  port: 3000,
  userId: 1,
};

const jsonObj = JSON.stringify(obj);
const args = [`--settings=${jsonObj}`];
console.log("args", args);
const botDataArg = args.find((arg) => arg.startsWith("--settings="));
console.log("botDataArg", botDataArg);
const serializedData = botDataArg.split("=")[1];
console.log("serializedData", serializedData);
const settings = JSON.parse(serializedData);
console.log("settings", settings);
