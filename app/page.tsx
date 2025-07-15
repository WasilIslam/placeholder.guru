import { PhotoIcon, DocumentTextIcon, PencilSquareIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceCard from "./components/ServiceCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br to-accent/5 text-foreground font-[family-name:var(--font-1)] flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-20">
            <h1 className="text-6xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-gradient">
              What do you want to generate?
            </h1>
            <p className="text-2xl text-muted/80 max-w-3xl mx-auto leading-relaxed">
              Powerful placeholder APIs for your development workflow
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <ServiceCard
              href="/image"
              title="Images"
              description="Generate custom placeholder images with any dimensions, colors, and text. Perfect for mockups and prototypes."
              icon={<PhotoIcon className="w-10 h-10 text-white" />}
              apiExample="/api/image?width=800&height=600&text=Hello"
              gradientFrom="from-blue-500"
              gradientTo="to-blue-600"
              hoverGradient="from-blue-500/10 to-transparent"
            />

            <ServiceCard
              href="/json"
              title="JSON Data"
              description="Generate sample JSON data structures for testing APIs, databases, and applications with realistic content."
              icon={<DocumentTextIcon className="w-10 h-10 text-white" />}
              apiExample="/api/json?type=users&count=10"
              gradientFrom="from-green-500"
              gradientTo="to-green-600"
              hoverGradient="from-green-500/10 to-transparent"
            />

            <ServiceCard
              href="/text"
              title="Text Content"
              description="Generate Lorem ipsum, random text, and themed content for your projects. Multiple styles available."
              icon={<PencilSquareIcon className="w-10 h-10 text-white" />}
              apiExample="/api/text?type=lorem&length=100"
              gradientFrom="from-purple-500"
              gradientTo="to-purple-600"
              hoverGradient="from-purple-500/10 to-transparent"
            />

            <ServiceCard
              href="/audio"
              title="Audio Files"
              description="Access speech samples and tune files for prototyping audio features and testing media functionality."
              icon={<SpeakerWaveIcon className="w-10 h-10 text-white" />}
              apiExample="/api/audio?type=speech"
              gradientFrom="from-orange-500"
              gradientTo="to-orange-600"
              hoverGradient="from-orange-500/10 to-transparent"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
