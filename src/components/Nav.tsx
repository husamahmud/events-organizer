import { Input } from '@/components/ui/input'

export default function Nav() {
  return (
    <nav className="h-[65px] border-b border-stone-900 flex items-center px-6 gap-4">
      <div className="w-1/2">
        <Input
          placeholder="search" />
      </div>
    </nav>
  )
}
