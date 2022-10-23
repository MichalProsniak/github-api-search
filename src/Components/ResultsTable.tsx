import React from 'react'
import { dataResponse } from '../ApiComunicator/SearchInApi';
import { TableRow } from './TableRow'

interface ResultsTableProps {
    searchResult: dataResponse
}

export const ResultsTable: React.FC<ResultsTableProps> = ({searchResult}) => {
        return (<div>
            <h2>Results</h2>
            <table>
                <tbody>
                    <tr>
                        <td className='td-file' >File</td>
                        <td className='td-description' >Repo description</td>
                        <td className='td-owner' >Owner</td>
                    </tr>
                    {searchResult.data.items.map((item, index) => {
                        return (<TableRow 
                            key={index}
                            name={item.name} 
                            description={item.repository.description} 
                            ownerName={item.repository.owner.login}
                            fileHtml={item.html_url}
                            avatar={item.repository.owner.avatar_url}/> )
                        })}
                </tbody>
                </table>
            
        </div>);
}