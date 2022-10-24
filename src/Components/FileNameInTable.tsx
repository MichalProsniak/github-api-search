import React from 'react'

interface FileNameInTableProps {
    name: string,
    fileHtml: string;
}

export const FileNameInTable: React.FC<FileNameInTableProps> = ({name, fileHtml}) => {
        return (
            <div>
                <p><b>{name}</b></p>
                <button className='table-button' onClick={() => {window.open(fileHtml,'_blank')}}>Check in GitHub</button>
            </div>
        );
}