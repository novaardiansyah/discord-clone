import { cn } from '@/lib/utils'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('bg-red-400 h-screen')}>
      {children}
    </div>
  )
}

export default AuthLayout
