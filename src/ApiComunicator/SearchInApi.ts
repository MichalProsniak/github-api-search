import { Octokit } from "octokit";

const octokit = new Octokit({ 
    auth: process.env.TOKEN
  });

function queryStringCreator(phrase: string, owner: string, language: string)
{
    let queryString = `q=${phrase}+user:${owner}`;
    if (language !== 'null')
    {
      queryString += `+language:${language}`;
    }
    return queryString;
}

export async function searchInApi(phrase: string, owner: string, language: string, currentPage: number, itemsPerPage: number) {
    const queryString = queryStringCreator(phrase, owner, language);
    try{
      const result = await octokit.request('GET /search/code', {
        q: queryString,
        page: currentPage,
        per_page: itemsPerPage
      })
      return result;
    }
    catch (error) {
      console.log(error)
    }
  }