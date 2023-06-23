import { IFullNameVariable } from "@/interfaces";

const dadataUrl =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";

const token = process.env.VUE_APP_DADATA_API_TOKEN;

export const getNameVariants = (
  query: string,
): Promise<{ suggestions: IFullNameVariable[] }> => {
  return fetch(dadataUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: query }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Ошибка");
      }
    })
    .catch((error) => console.log("error", error));
};
