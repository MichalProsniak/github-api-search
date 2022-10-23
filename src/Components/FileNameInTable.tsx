import React from 'react'

interface FileNameInTableProps {
    name: string,
    fileHtml: string;
}

export const FileNameInTable: React.FC<FileNameInTableProps> = ({name, fileHtml}) => {
        return (
            <div>
                <p><b>{name}</b></p>
                <form action={fileHtml}>
                    <input type="submit" value="Check in GitHub" />
                </form>
            </div>
        );
}