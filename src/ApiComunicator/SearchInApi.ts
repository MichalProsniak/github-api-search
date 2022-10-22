import { Octokit } from "octokit";

const octokit = new Octokit({ 
    auth: process.env.TOKEN
  });

export async function searchInApi(phrase: string, owner: string, language: string, currentPage: number, itemsPerPage: number) {
    let queryString = `q=${phrase}+user:${owner}`;
    if (language !== 'null')
    {
      queryString += `+language:${language}`;
    }
    try{
      const result = await octokit.request('GET /search/code', {
        q: queryString,
        page: currentPage,
        per_page: itemsPerPage
      })
      console.log(result.data)
    }
    catch (error) {
      console.log(error)
    }
  }