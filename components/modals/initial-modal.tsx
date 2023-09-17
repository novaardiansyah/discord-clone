'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FileUpload from '../file-upload'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1, 'Server name is required'),
  imageUrl: z.string().min(1, 'Server image is required')
})

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })
  
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isMounted) return null

  return (
    <Dialog open>
      <DialogContent className={cn('bg-white text-black p-0 overflow-hidden')}>
        <DialogHeader className={cn('pt-8 px-6')}>
          <DialogTitle className={cn('text-2xl text-center font-bold ')}>
            Customize your server
          </DialogTitle>

          <DialogDescription className={cn('text-center text-zinc-500')}>
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8')}>
            <div className={cn('space-y-8 px-6')}>
              <div className={cn('flex justify-center items-center text-center ')}>
                <FormField 
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn('uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70')}>
                      Server Name
                    </FormLabel>

                    <FormControl>
                      <Input className={cn('bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black')} placeholder="Enter Server Name" disabled={isLoading} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className={cn('bg-gray-100 px-6 py-4')}>
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
