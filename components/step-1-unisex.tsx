"use client"

import { Search, Activity, Instagram, MapPin, Eye, ShieldCheck, Heart, Camera, MessageSquare, Check, CheckCircle, Star, FolderArchive, Users, Smartphone, ScanFace } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { FacebookTracker } from '@/components/FacebookTracker'


// Componente auxiliar para as estrelas
const StarRating = ({ rating = 5 }) => (
    <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} className="w-5 h-5 fill-current" />
        ))}
    </div>
);

export default function Step1Unisex() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/step-2');
    };

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Facebook Tracking - envia dados enriquecidos para o dataLayer */}
            <FacebookTracker
                eventName="Lead"
                contentName="Step 1 - Unisex Landing Page"
                contentCategory="Sales Funnel"
            />

            {/* =================================== */}
            {/* 1. Hero Section                     */}
            {/* =================================== */}
            <section className="bg-gradient-to-br from-[#0A1128] via-[#1d1d3a] to-[#2D1B69] text-white py-16 px-4 overflow-hidden">
                <div className="container mx-auto max-w-3xl text-center flex flex-col items-center">

                    <div className="inline-flex items-center gap-3 bg-white/10 p-4 rounded-2xl shadow-lg mb-6">
                        <Instagram className="h-8 w-8 text-pink-400" />
                        <Smartphone className="h-8 w-8 text-green-400" />
                        <ScanFace className="h-8 w-8 text-cyan-400" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        You're Not <span className="text-red-500">Paranoid</span> —<br />
                        You're <span className="text-cyan-400">Investigating</span>
                    </h1>

                    <p className="text-lg text-gray-300 mb-4 max-w-xl">
                        That gut feeling? It exists for a reason. Every minute you wait is another minute
                        of doubt eating away at your peace.
                    </p>

                    <p className="text-lg text-white font-bold mb-8 max-w-xl">
                        Scan their digital footprint. Find hidden dating profiles. Get the truth in under 2 minutes.
                    </p>

                    <div className="inline-flex items-center bg-cyan-900/50 text-cyan-300 border border-cyan-700 rounded-full px-4 py-1.5 text-sm mb-8">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Advanced Detection Algorithm - Updated February 2026</span>
                    </div>

                    <div className="w-full max-w-lg space-y-4 text-left mb-8">
                        {/* Item 1 - Instagram Scanner */}
                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-pink-500 shadow-md">
                            <div className="text-3xl mt-1">📸</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Instagram Profile Scanner</span>
                                Discover hidden follows, suspicious likes at 2 AM, and profiles they visit repeatedly — even private ones.
                            </div>
                        </div>

                        {/* Item 2 - WhatsApp Scanner */}
                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-green-500 shadow-md">
                            <div className="text-3xl mt-1">💬</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">WhatsApp Activity Tracker</span>
                                "Deleted" messages leave digital traces. See who they talk to all day — then delete before you wake up.
                            </div>
                        </div>

                        {/* Item 3 - Dating App Detector */}
                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-orange-500 shadow-md">
                            <div className="text-3xl mt-1">🔥</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Dating App Profile Finder</span>
                                Use their photo to scan Tinder, Bumble, Hinge, and 50+ dating apps. Hidden profiles exposed instantly.
                            </div>
                        </div>

                        {/* Item 4 - Photo Recognition */}
                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-cyan-500 shadow-md">
                            <div className="text-3xl mt-1">🔍</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Facial Recognition Scan</span>
                                Upload one photo. Our AI will scan millions of profiles to find matches on dating platforms.
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleNavigate}
                        className="w-full max-w-lg bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        🔍 START ANONYMOUS INVESTIGATION
                    </button>
                    <p className="text-xs text-gray-400 mt-2">100% anonymous. They'll never know you checked.</p>
                </div>
            </section>

            {/* =================================== */}
            {/* 2. "Signs You Know Too Well" Section */}
            {/* =================================== */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        The Signs You Know
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-red-500 mb-6">
                        Too Well
                    </h3>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-6">
                        Trusting your gut isn't paranoia — it's survival instinct.
                        If you're reading this, something already feels wrong.
                    </p>
                    <p className="text-lg text-black font-bold mb-12 max-w-xl mx-auto">
                        You deserve clarity. You deserve proof. You deserve to know.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="inline-block bg-red-100 p-4 rounded-xl mb-4">
                                <Smartphone className="h-8 w-8 text-red-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">PHONE ON "DO NOT DISTURB"</h4>
                            <p className="text-gray-500 text-sm">Their phone used to be on the table. Now it's face-down, on silent, or goes to the bathroom with them.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="inline-block bg-purple-100 p-4 rounded-xl mb-4">
                                <Eye className="h-8 w-8 text-purple-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">PASSWORD CHANGES</h4>
                            <p className="text-gray-500 text-sm">New passwords, new PIN codes, Face ID suddenly enabled. What are they protecting?</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="inline-block bg-orange-100 p-4 rounded-xl mb-4">
                                <Activity className="h-8 w-8 text-orange-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">SUDDEN "OVERTIME"</h4>
                            <p className="text-gray-500 text-sm">Late nights at work, sudden "friends' nights," stories that don't add up. But location tracking is always off.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <div className="inline-block bg-pink-100 p-4 rounded-xl mb-4">
                                <Heart className="h-8 w-8 text-pink-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">INTIMACY DISAPPEARED</h4>
                            <p className="text-gray-500 text-sm">Sudden change in affection. Distant, cold, or overcompensating with love bombing. Something shifted.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================== */}
            {/* 3. What We Scan Section             */}
            {/* =================================== */}
            <section className="bg-gradient-to-br from-[#0A1128] to-[#1d1d3a] py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Complete <span className="text-cyan-400">Digital Footprint</span> Analysis
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                        Our advanced algorithm scans across multiple platforms to find hidden activity, secret profiles, and digital traces they thought were deleted.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">📱</div>
                            <p className="text-white font-bold text-sm">Instagram</p>
                            <p className="text-gray-400 text-xs">Hidden activity</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">💬</div>
                            <p className="text-white font-bold text-sm">WhatsApp</p>
                            <p className="text-gray-400 text-xs">Deleted chats</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">🔥</div>
                            <p className="text-white font-bold text-sm">Tinder</p>
                            <p className="text-gray-400 text-xs">Hidden profiles</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">💛</div>
                            <p className="text-white font-bold text-sm">Bumble</p>
                            <p className="text-gray-400 text-xs">Active accounts</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">💜</div>
                            <p className="text-white font-bold text-sm">Hinge</p>
                            <p className="text-gray-400 text-xs">Profile matches</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">✈️</div>
                            <p className="text-white font-bold text-sm">Telegram</p>
                            <p className="text-gray-400 text-xs">Secret chats</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">📍</div>
                            <p className="text-white font-bold text-sm">Location</p>
                            <p className="text-gray-400 text-xs">GPS history</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl text-center">
                            <div className="text-4xl mb-3">➕</div>
                            <p className="text-white font-bold text-sm">50+ Apps</p>
                            <p className="text-gray-400 text-xs">Full scan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================== */}
            {/* 4. Testimonials Section             */}
            {/* =================================== */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Over <span className="text-red-500">127,000 people</span> found the truth
                    </h2>
                    <div className="space-y-8">
                        {/* Testimonial 1 - Female */}
                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/83.jpg" alt="Sarah" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">Sarah, 38</p>
                                    <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-4 before:content-['"'] after:content-['"']">
                            For 8 months he called me crazy and paranoid. The scan found his Tinder profile — still active — and conversations with his 'work friend' that made everything clear. I'm not crazy. I was right.
                        </blockquote>
                        <StarRating />
                    </div>

                    {/* Testimonial 2 - Male */}
                    <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                        <div className="flex items-center mb-4">
                            <Image src="/images/man1.jpg" alt="Michael" width={48} height={48} className="rounded-full mr-4" />
                            <div>
                                <p className="font-bold">Michael, 41</p>
                                <p className="text-sm text-gray-500">Investigation completed January 2026</p>
                            </div>
                        </div>
                        <blockquote className="text-gray-600 italic mb-4 before:content-['"'] after:content-['"']">
                        She said I was paranoid and controlling. Her phone was always face-down, intimacy disappeared. The photo scan found her Bumble profile created 3 months ago. Without proof, she would've kept gaslighting me.
                    </blockquote>
                    <StarRating />
                </div>

                {/* Testimonial 3 - Female */}
                <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                    <div className="flex items-center mb-4">
                        <Image src="/images/87.jpg" alt="Jessica" width={48} height={48} className="rounded-full mr-4" />
                        <div>
                            <p className="font-bold">Jessica, 29</p>
                            <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                        </div>
                    </div>
                    <blockquote className="text-gray-600 italic mb-4 before:content-['"'] after:content-['"']">
                    Honestly? I was hoping to prove myself wrong. The scan came back clean. No hidden profiles. No dating apps. Now I can actually trust him without that voice in my head. Best $47 I ever spent.
                </blockquote>
                <StarRating />
        </div>
          </div >
        </div >
      </section >

        {/* =================================== */ }
    {/* 5. "You're Not Crazy" Section       */ }
    {/* =================================== */ }
    <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                "Without Proof, They'll Make You <span className="text-red-500">Look Crazy</span>"
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Gaslighting is real. When you confront without evidence, they flip it on you.
                "You're paranoid." "You're controlling." "You need therapy."
            </p>
            <p className="text-lg text-black font-bold mb-8 max-w-xl mx-auto">
                Technical evidence stops the manipulation cold. Data doesn't lie.
            </p>
            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-8 rounded-2xl max-w-xl mx-auto">
                <p className="text-gray-700 mb-4">
                    <span className="font-bold text-cyan-600">Private investigator:</span> $2,000 - $5,000
                </p>
                <p className="text-gray-700 mb-4">
                    <span className="font-bold text-purple-600">Weeks of torturous doubt:</span> Priceless suffering
                </p>
                <p className="text-gray-700">
                    <span className="font-bold text-green-600">InfidelityFind complete scan:</span> Under $50
                </p>
            </div>
        </div>
    </section>

    {/* =================================== */ }
    {/* 6. Final CTA Section (Dark Theme)   */ }
    {/* =================================== */ }
    <section className="bg-gradient-to-br from-[#0A1128] via-[#1d1d3a] to-[#2D1B69] py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">

            {/* Impactful Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
                The Doubt Won't Go Away<br className="hidden md:block" />
                Until You <span className="text-cyan-400">Know</span>
            </h2>

            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                You can keep wondering. Keep losing sleep. Keep checking their phone when they're not looking.
                Or you can get answers in the next 2 minutes.
            </p>

            {/* Button */}
            <button
                onClick={handleNavigate}
                className="w-full max-w-lg bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-extrabold py-5 px-6 rounded-full text-lg md:text-xl shadow-[0_10px_40px_-10px_rgba(255,100,50,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
            >
                <span className="text-2xl">🔍</span> RUN ANONYMOUS SCAN NOW
            </button>

            {/* Footer Texts */}
            <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-300">
                    100% anonymous. Your investigation stays completely private.
                </p>
                <p className="text-sm text-gray-400">
                    Trusted by 127,000+ people worldwide.
                </p>
            </div>

        </div>
    </section>

    </div >
  )
}
