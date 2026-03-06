import { Button } from "./retroui/Button"
import { Card, CardContent } from "./retroui/Card"
import { Calendar, MapPin, Download } from "lucide-react"

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="border-b-2 border-border p-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary border-2 border-border flex items-center justify-center font-head font-bold shadow-sm">
            E
          </div>
          <span className="font-head text-xl font-bold tracking-tight uppercase">ExamScheduler</span>
        </div>
        <Button variant="outline" onClick={onStart}>
          Enter App
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        
        <div className="max-w-4xl space-y-8 z-10">
          <h1 className="font-head text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] drop-shadow-sm">
            Never Miss <br/> <span className="text-primary [-webkit-text-stroke:2px_#000] drop-shadow-[4px_4px_0_var(--border)]">An Exam</span> Again.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            A brutalist, minimal, and highly functional tool to schedule your exams and generate beautiful PDF timetables.
          </p>
          
          <div className="pt-8 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto text-black" onClick={onStart}>
              Start Scheduling Now
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
              View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 z-10">
          <Card className="hover:-translate-y-1 transition-transform duration-200">
            <CardContent className="p-6 space-y-4 text-left">
              <div className="w-12 h-12 rounded-none bg-accent border-2 border-border shadow-sm flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-head text-xl font-bold uppercase tracking-tight">Stay Organized</h3>
              <p className="text-muted-foreground">Keep all your exam dates, times, and locations in one secure, easy-to-read dashboard.</p>
            </CardContent>
          </Card>
          
          <Card className="hover:-translate-y-1 transition-transform duration-200">
            <CardContent className="p-6 space-y-4 text-left">
              <div className="w-12 h-12 rounded-none bg-primary border-2 border-border shadow-sm flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-head text-xl font-bold uppercase tracking-tight">Track Details</h3>
              <p className="text-muted-foreground">Add specific notes, room numbers, and course codes so you're never scrambling on exam day.</p>
            </CardContent>
          </Card>
          
          <Card className="hover:-translate-y-1 transition-transform duration-200">
            <CardContent className="p-6 space-y-4 text-left">
              <div className="w-12 h-12 rounded-none bg-destructive text-destructive-foreground border-2 border-border shadow-sm flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-head text-xl font-bold uppercase tracking-tight">Export PDF</h3>
              <p className="text-muted-foreground">Generate a clean, printable PDF timetable with one click. Ready for your dorm wall or backpack.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border p-6 text-center text-sm font-medium text-muted-foreground">
        <p>Built with RetroUI & Vite. Because exams are stressful enough, your scheduler shouldn't be.</p>
      </footer>
    </div>
  )
}
