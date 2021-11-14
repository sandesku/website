import * as Constant from "../constants";
import axios from "axios";

export const host = axios.create({
    baseURL: Constant.BASE_API_URL
});


export const ping = async () => {
    return await host.get(Constant.PING_URL);
};

export const getArticleList = async() => {
    return await host.get(Constant.ARTICLE_LIST_URL, Constant.INTERNAL_AUTH_HEADER);
}

export const getArticle = async(code) => {
    return await host.get(Constant.ARTICLE_URL(code), Constant.INTERNAL_AUTH_HEADER);
}