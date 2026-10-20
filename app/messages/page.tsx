import { Mail } from 'lucide-react'

export default function Messages() {
  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 px-4 py-3 border-b border-border">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-8">
        <Mail size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Welcome to your inbox!</h2>
        <p className="text-muted-foreground text-sm">Drop a line, share posts and more with private conversations between you and others.</p>
      </div>
    </div>
  )
}
