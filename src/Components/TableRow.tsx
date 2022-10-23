import React from 'react'
import {FileNameInTable} from './FileNameInTable'

interface TableRowProps {
    name: string,
    description: string | null;
    ownerName: string,
    fileHtml: string,
    avatar: string
}

export const TableRow: React.FC<TableRowProps> = ({name, description, ownerName, fileHtml, avatar}) => {
        return (
            <tr>
                <td className='td-file'><FileNameInTable fileHtml={fileHtml} name={name}/></td>
                <td className='td-description'>{description}</td>
                <td className='td-owner'>{ownerName}</td>
            </tr>
        );
}