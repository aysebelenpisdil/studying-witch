import { WitchSprite } from "@/components/WitchSprite";

export default function Home() {
  return (
    <div className="font-sans min-h-screen relative overflow-hidden"
         style={{
           backgroundImage: `url('/background.png')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      {/* Background stars/sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse absolute top-20 left-10 w-1 h-1 bg-yellow-300 rounded-full"></div>
        <div className="animate-pulse absolute top-32 right-20 w-1 h-1 bg-purple-300 rounded-full delay-1000"></div>
        <div className="animate-pulse absolute bottom-40 left-32 w-1 h-1 bg-blue-300 rounded-full delay-2000"></div>
      </div>

      <main className="container mx-auto px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <img src="/logo.png" alt="Studying Witch Logo" className="w-24 h-24 mr-4" style={{imageRendering: 'pixelated'}} />
            <h1 className="text-6xl font-bold text-white">
              <span className="text-white drop-shadow-lg">
                Studying Witch
              </span>
            </h1>
          </div>
          <p className="text-xl text-white drop-shadow-lg bg-white/10 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-md">
            Cast productivity spells with your magical study companion
          </p>
        </div>

        {/* Witch Character Demo */}
        <div className="flex justify-center items-center gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-white drop-shadow-lg mb-4 bg-white/10 backdrop-blur-sm rounded-lg p-2">Idle</h3>
            <WitchSprite animation="idle" />
          </div>
          <div className="text-center">
            <h3 className="text-white drop-shadow-lg mb-4 bg-white/10 backdrop-blur-sm rounded-lg p-2">Flying</h3>
            <WitchSprite animation="flying" />
          </div>
          <div className="text-center">
            <h3 className="text-white drop-shadow-lg mb-4 bg-white/10 backdrop-blur-sm rounded-lg p-2">Sleeping</h3>
            <WitchSprite animation="sleeping" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12 space-y-4">
          <a
            href="/study"
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold text-xl px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg border border-white/30"
          >
            ✨ Start Your Magical Study Session ✨
          </a>
          
          {/* Auth buttons */}
          <div className="flex gap-4 justify-center">
            <a
              href="/auth/signin"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/30 transition-colors"
            >
              🔮 Sign In
            </a>
            <a
              href="/auth/signup"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-2 rounded-lg border border-white/30 transition-colors"
            >
              ⭐ Sign Up
            </a>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">⏰ Pomodoro Timer</h3>
            <p className="text-white/90">
              Focus with magical 25-minute study sessions while your witch companion flies around
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">📋 Todo Magic</h3>
            <p className="text-white/90">
              Manage your tasks with spell-binding organization. Watch your witch celebrate completions!
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">📊 Progress Tracking</h3>
            <p className="text-white/90">
              Track your study streaks and achievements with mystical progress indicators
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
