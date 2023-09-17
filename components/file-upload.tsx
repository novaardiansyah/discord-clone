'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { cn } from '@/lib/utils'

interface Props {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

const FileUpload = ({ onChange, value, endpoint }: Props) => {
  const fileType = value?.split('.').pop() || 'pdf'

  if (value && fileType !== 'pdf')
  {
    return (
      <div className={cn('relative h-20 w-20')}>
        <Image
          fill
          src={value}
          alt="upload-image"
          className={cn('rounded-full')}
        />

        <button
          onClick={() => onChange('')}
          type="button"
          className={cn('bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm')}
        >
          <X className={cn('h-4 w-4')} />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone 
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.error(error)
      }}
    />
  )
}

export default FileUpload
