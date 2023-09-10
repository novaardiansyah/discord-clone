import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
      <p className={cn('text-3xl font-bold text-indigo-500')}>Hello World</p>
      <Button variant="destructive">Click Me</Button>
    </div>
  )
}

export default Home