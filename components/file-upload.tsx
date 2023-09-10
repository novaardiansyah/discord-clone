'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'

interface Props {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

const FileUpload = ({ onChange, value, endpoint }: Props) => {
  return (
    <UploadDropzone 
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].fileUrl)
      }}
      onUploadError={(error: Error) => {
        console.error(error)
      }}
    />
  )
}

export default FileUpload
