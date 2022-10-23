import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";


const octokit = new Octokit({ 
    auth: process.env.TOKEN
  });

export type dataParameters = Endpoints["GET /search/code"]["parameters"];
export type dataResponse = Endpoints["GET /search/code"]["response"];

export const parametersCreator = (phrase: string, owner: string, language: string, currentPage: number, itemsPerPage: number) : dataParameters =>
{
    let queryString = `q=${phrase}+user:${owner}`;
    if (language !== 'null')
    {
      queryString += `+language:${language}`;
    }
    return {q: queryString, per_page: itemsPerPage, page: currentPage};
}

export const searchInApi = (params: dataParameters) : Promise<dataResponse> | undefined => {
    try{
      const result = octokit.request('GET /search/code', {
        q: params.q,
        page: params.page,
        per_page: params.per_page
      })
      return result;
    }
    catch (error) {
      console.log(error)
    }
  }