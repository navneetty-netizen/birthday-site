import { Scroll, useScroll, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Hero } from './components/Hero'
import { Countdown } from './components/Countdown'
import { Gallery } from './components/Gallery'
import { Videos } from './components/Videos'
import { Message } from './components/Message'
import { FloatingHearts } from './components/FloatingHearts'
import { MEDIA_CONFIG, MEDIA_BASE_URL } from './config'

export default function Experience() {
    return (
        <>
            {/* Global Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />

            {/* Background Particles/Hearts */}
            <FloatingHearts />

            {/* Scrollable Content */}
            <Scroll>
                {/* Each component positions itself based on scroll offset or fixed positions */}
                <Hero />
                <Countdown position-y={-4} />
                <Gallery position-y={-8} />
                <Videos position-y={-12} />
                <Message position-y={-16} />
            </Scroll>

            {/* HTML Overlay Content (if needed) */}
            <Scroll html>
                <div className="w-screen h-screen"></div> {/* Hero spacer */}
                <div className="w-screen h-screen"></div> {/* Countdown spacer */}
                <div className="w-screen h-screen"></div> {/* Gallery spacer */}

                {/* HTML Video Section */}
                <div className="w-screen h-screen flex flex-col items-center justify-center p-10 bg-transparent pointer-events-none">
                    <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                        {MEDIA_CONFIG.videos.map((id) => (
                            <div key={id} className="bg-white p-2 rounded-lg shadow-xl" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                                <video
                                    src={`${MEDIA_BASE_URL}${id}`}
                                    controls
                                    className="w-full rounded"
                                    playsInline
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
                    {/* Message Overlay */}
                    <div className="pointer-events-auto bg-white/90 p-8 rounded-2xl shadow-2xl max-w-2xl mx-4 text-center">
                        <h2 className="text-3xl font-bold text-[#ff6b9d] mb-4">A Letter for You</h2>
                        <p className="text-gray-700 leading-relaxed mb-4 text-left">
                            On this special day, I want you to know how much you mean to me. Every moment we've shared has been a treasure, and I'm grateful for every memory we've created together.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4 text-left">
                            You bring light into my life in ways I never imagined possible. Your smile, your laughter, your presence—everything about you makes my world brighter.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4 text-left">
                            As we celebrate another year of your amazing journey, I hope this day is filled with all the joy, love, and happiness you deserve. You are truly special, and I'm so lucky to have you in my life.
                        </p>
                        <p className="text-[#c44569] font-serif italic text-xl mt-6">With all my love ❤️</p>
                    </div>
                </div>
            </Scroll>
        </>
    )
}


