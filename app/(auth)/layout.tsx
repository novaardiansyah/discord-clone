import { cn } from '@/lib/utils'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('h-full flex items-center justify-center')}>
      {children}
    </div>
  )
}

export default AuthLayout
