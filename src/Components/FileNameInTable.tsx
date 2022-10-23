import React from 'react'

interface FileNameInTableProps {
    name: string,
    fileHtml: string;
}

export const FileNameInTable: React.FC<FileNameInTableProps> = ({name, fileHtml}) => {
        return (
            <div>
                <p><b>{name}</b></p>
                <a className='table-button' href={fileHtml}>Check in GitHub</a>
            </div>
        );
}