import { currentProfile } from '@/lib/current-profile'
import { cn } from '@/lib/utils'
import { Server } from '@/schema'
import { redirect } from 'next/navigation'
import React from 'react'
import NavigationAction from '@/components/navigation/navigation-action'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import NavigationItem from '@/components/navigation/navigation-item'
import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'

const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) return redirect('/')

  const servers = await Server.find({ _profileId: profile._id })
  console.log('servers', servers)

  return (
    <div
      className={cn('space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3')}
    >
      <NavigationAction />
      <Separator 
        className={cn('h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded w-10 mx-auto')}
      />

      <ScrollArea className={cn('flex-1 w-full')}>
        {servers && 
          servers.map((server) => (
            <div className={cn('mb-4')} key={`server-${server.inviteCode}`}>
              <NavigationItem serverCode={server.inviteCode} name={server.name} imageUrl={server.imageUrl} />
            </div>
          ))
        }
      </ScrollArea>

      <div className={cn('pb-3 mt-auto flex items-center flex-col gap-y-4')}>
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[36px] w-[36px]'
            }
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
