import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
  let uuidToken = localStorage.getItem("UUIDTOKEN");
  if (!uuidToken) {
    // 如果本地没有，就生成一个
    uuidToken = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuidToken);
  }
  return uuidToken;
};
