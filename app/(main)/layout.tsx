import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import { cn } from '@/lib/utils'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('h-full')}>
      <div className={cn('hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0')}>
        <NavigationSidebar />
      </div>

      <main className={cn('md:pl-[72px] h-full')}>
        {children}
      </main>
    </div>
  )
}

export default MainLayout