import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Logomarca oficial (asset original do domínio, 1920×403).
 * Nunca recolorir, redesenhar ou substituir por texto estilizado.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Amigos da Mesa PRO"
      width={1920}
      height={403}
      priority={priority}
      className={cn('h-7 w-auto md:h-8', className)}
    />
  )
}
