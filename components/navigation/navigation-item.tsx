'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { ActionTooltip } from '@/components/action-tooltip'
import { cn } from '@/lib/utils'

interface propsConf {
  serverCode: string
  imageUrl: string
  name: string
}

const NavigationItem = ({ serverCode, imageUrl, name }: propsConf) => {
  const router = useRouter()
  const params = useParams()

  const handleClick = () => {
    router.push(`/servers/${serverCode}`)
  }

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={handleClick}
        className={cn('group relative flex items-center')}
      >
        <div 
          className={cn('absolute left-0 bg-primary rounded-r-full transition-all w-[4px]', 
            params?.serverCode !== serverCode && 'group-hover:h-[28px]', 
            params?.serverCode === serverCode ? 'h-[36px]' : 'h-[8px]'
          )}
        />

        <div 
          className={cn('relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] overflow-hidden',
            params?.serverCode === serverCode && 'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <Image 
            fill
            src={imageUrl}
            alt={`channel-${name}`}
          />
        </div>
      </button>
    </ActionTooltip>
  )
}

export default NavigationItem
