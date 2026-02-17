"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { CheckCircle, AlertTriangle, Lock, LockOpen, Heart, MessageCircle, Info, ChevronDown } from "lucide-react"


// ==========================================================
// COUNTRY CODES (English-speaking first, then alphabetical)
// ==========================================================
const countryCodes = [
  // English-speaking countries first
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States", short: "US" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom", short: "GB" },
  { code: "+1", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada", short: "CA" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia", short: "AU" },
  { code: "+353", flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland", short: "IE" },
  { code: "+64", flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand", short: "NZ" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa", short: "ZA" },
  { code: "+254", flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya", short: "KE" },
  { code: "+234", flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria", short: "NG" },
  { code: "+233", flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana", short: "GH" },
  { code: "+63", flag: "\u{1F1F5}\u{1F1ED}", name: "Philippines", short: "PH" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore", short: "SG" },
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India", short: "IN" },
  { code: "+1", flag: "\u{1F1EF}\u{1F1F2}", name: "Jamaica", short: "JM" },
  { code: "+1", flag: "\u{1F1F9}\u{1F1F9}", name: "Trinidad & Tobago", short: "TT" },
  // Separator - rest of world alphabetical
  { code: "+93", flag: "\u{1F1E6}\u{1F1EB}", name: "Afghanistan", short: "AF" },
  { code: "+355", flag: "\u{1F1E6}\u{1F1F1}", name: "Albania", short: "AL" },
  { code: "+213", flag: "\u{1F1E9}\u{1F1FF}", name: "Algeria", short: "DZ" },
  { code: "+376", flag: "\u{1F1E6}\u{1F1E9}", name: "Andorra", short: "AD" },
  { code: "+244", flag: "\u{1F1E6}\u{1F1F4}", name: "Angola", short: "AO" },
  { code: "+54", flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina", short: "AR" },
  { code: "+374", flag: "\u{1F1E6}\u{1F1F2}", name: "Armenia", short: "AM" },
  { code: "+43", flag: "\u{1F1E6}\u{1F1F9}", name: "Austria", short: "AT" },
  { code: "+994", flag: "\u{1F1E6}\u{1F1FF}", name: "Azerbaijan", short: "AZ" },
  { code: "+973", flag: "\u{1F1E7}\u{1F1ED}", name: "Bahrain", short: "BH" },
  { code: "+880", flag: "\u{1F1E7}\u{1F1E9}", name: "Bangladesh", short: "BD" },
  { code: "+375", flag: "\u{1F1E7}\u{1F1FE}", name: "Belarus", short: "BY" },
  { code: "+32", flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium", short: "BE" },
  { code: "+591", flag: "\u{1F1E7}\u{1F1F4}", name: "Bolivia", short: "BO" },
  { code: "+387", flag: "\u{1F1E7}\u{1F1E6}", name: "Bosnia", short: "BA" },
  { code: "+55", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil", short: "BR" },
  { code: "+359", flag: "\u{1F1E7}\u{1F1EC}", name: "Bulgaria", short: "BG" },
  { code: "+855", flag: "\u{1F1F0}\u{1F1ED}", name: "Cambodia", short: "KH" },
  { code: "+237", flag: "\u{1F1E8}\u{1F1F2}", name: "Cameroon", short: "CM" },
  { code: "+56", flag: "\u{1F1E8}\u{1F1F1}", name: "Chile", short: "CL" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", name: "China", short: "CN" },
  { code: "+57", flag: "\u{1F1E8}\u{1F1F4}", name: "Colombia", short: "CO" },
  { code: "+506", flag: "\u{1F1E8}\u{1F1F7}", name: "Costa Rica", short: "CR" },
  { code: "+385", flag: "\u{1F1ED}\u{1F1F7}", name: "Croatia", short: "HR" },
  { code: "+53", flag: "\u{1F1E8}\u{1F1FA}", name: "Cuba", short: "CU" },
  { code: "+357", flag: "\u{1F1E8}\u{1F1FE}", name: "Cyprus", short: "CY" },
  { code: "+420", flag: "\u{1F1E8}\u{1F1FF}", name: "Czech Republic", short: "CZ" },
  { code: "+45", flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark", short: "DK" },
  { code: "+593", flag: "\u{1F1EA}\u{1F1E8}", name: "Ecuador", short: "EC" },
  { code: "+20", flag: "\u{1F1EA}\u{1F1EC}", name: "Egypt", short: "EG" },
  { code: "+503", flag: "\u{1F1F8}\u{1F1FB}", name: "El Salvador", short: "SV" },
  { code: "+372", flag: "\u{1F1EA}\u{1F1EA}", name: "Estonia", short: "EE" },
  { code: "+251", flag: "\u{1F1EA}\u{1F1F9}", name: "Ethiopia", short: "ET" },
  { code: "+358", flag: "\u{1F1EB}\u{1F1EE}", name: "Finland", short: "FI" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France", short: "FR" },
  { code: "+995", flag: "\u{1F1EC}\u{1F1EA}", name: "Georgia", short: "GE" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany", short: "DE" },
  { code: "+30", flag: "\u{1F1EC}\u{1F1F7}", name: "Greece", short: "GR" },
  { code: "+502", flag: "\u{1F1EC}\u{1F1F9}", name: "Guatemala", short: "GT" },
  { code: "+504", flag: "\u{1F1ED}\u{1F1F3}", name: "Honduras", short: "HN" },
  { code: "+852", flag: "\u{1F1ED}\u{1F1F0}", name: "Hong Kong", short: "HK" },
  { code: "+36", flag: "\u{1F1ED}\u{1F1FA}", name: "Hungary", short: "HU" },
  { code: "+354", flag: "\u{1F1EE}\u{1F1F8}", name: "Iceland", short: "IS" },
  { code: "+62", flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia", short: "ID" },
  { code: "+98", flag: "\u{1F1EE}\u{1F1F7}", name: "Iran", short: "IR" },
  { code: "+964", flag: "\u{1F1EE}\u{1F1F6}", name: "Iraq", short: "IQ" },
  { code: "+972", flag: "\u{1F1EE}\u{1F1F1}", name: "Israel", short: "IL" },
  { code: "+39", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy", short: "IT" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan", short: "JP" },
  { code: "+962", flag: "\u{1F1EF}\u{1F1F4}", name: "Jordan", short: "JO" },
  { code: "+7", flag: "\u{1F1F0}\u{1F1FF}", name: "Kazakhstan", short: "KZ" },
  { code: "+82", flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea", short: "KR" },
  { code: "+965", flag: "\u{1F1F0}\u{1F1FC}", name: "Kuwait", short: "KW" },
  { code: "+371", flag: "\u{1F1F1}\u{1F1FB}", name: "Latvia", short: "LV" },
  { code: "+961", flag: "\u{1F1F1}\u{1F1E7}", name: "Lebanon", short: "LB" },
  { code: "+218", flag: "\u{1F1F1}\u{1F1FE}", name: "Libya", short: "LY" },
  { code: "+370", flag: "\u{1F1F1}\u{1F1F9}", name: "Lithuania", short: "LT" },
  { code: "+352", flag: "\u{1F1F1}\u{1F1FA}", name: "Luxembourg", short: "LU" },
  { code: "+60", flag: "\u{1F1F2}\u{1F1FE}", name: "Malaysia", short: "MY" },
  { code: "+52", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico", short: "MX" },
  { code: "+212", flag: "\u{1F1F2}\u{1F1E6}", name: "Morocco", short: "MA" },
  { code: "+95", flag: "\u{1F1F2}\u{1F1F2}", name: "Myanmar", short: "MM" },
  { code: "+977", flag: "\u{1F1F3}\u{1F1F5}", name: "Nepal", short: "NP" },
  { code: "+31", flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands", short: "NL" },
  { code: "+505", flag: "\u{1F1F3}\u{1F1EE}", name: "Nicaragua", short: "NI" },
  { code: "+47", flag: "\u{1F1F3}\u{1F1F4}", name: "Norway", short: "NO" },
  { code: "+968", flag: "\u{1F1F4}\u{1F1F2}", name: "Oman", short: "OM" },
  { code: "+92", flag: "\u{1F1F5}\u{1F1F0}", name: "Pakistan", short: "PK" },
  { code: "+507", flag: "\u{1F1F5}\u{1F1E6}", name: "Panama", short: "PA" },
  { code: "+595", flag: "\u{1F1F5}\u{1F1FE}", name: "Paraguay", short: "PY" },
  { code: "+51", flag: "\u{1F1F5}\u{1F1EA}", name: "Peru", short: "PE" },
  { code: "+48", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland", short: "PL" },
  { code: "+351", flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal", short: "PT" },
  { code: "+974", flag: "\u{1F1F6}\u{1F1E6}", name: "Qatar", short: "QA" },
  { code: "+40", flag: "\u{1F1F7}\u{1F1F4}", name: "Romania", short: "RO" },
  { code: "+7", flag: "\u{1F1F7}\u{1F1FA}", name: "Russia", short: "RU" },
  { code: "+966", flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia", short: "SA" },
  { code: "+381", flag: "\u{1F1F7}\u{1F1F8}", name: "Serbia", short: "RS" },
  { code: "+421", flag: "\u{1F1F8}\u{1F1F0}", name: "Slovakia", short: "SK" },
  { code: "+386", flag: "\u{1F1F8}\u{1F1EE}", name: "Slovenia", short: "SI" },
  { code: "+34", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain", short: "ES" },
  { code: "+94", flag: "\u{1F1F1}\u{1F1F0}", name: "Sri Lanka", short: "LK" },
  { code: "+46", flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden", short: "SE" },
  { code: "+41", flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland", short: "CH" },
  { code: "+886", flag: "\u{1F1F9}\u{1F1FC}", name: "Taiwan", short: "TW" },
  { code: "+255", flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania", short: "TZ" },
  { code: "+66", flag: "\u{1F1F9}\u{1F1ED}", name: "Thailand", short: "TH" },
  { code: "+216", flag: "\u{1F1F9}\u{1F1F3}", name: "Tunisia", short: "TN" },
  { code: "+90", flag: "\u{1F1F9}\u{1F1F7}", name: "Turkey", short: "TR" },
  { code: "+256", flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda", short: "UG" },
  { code: "+380", flag: "\u{1F1FA}\u{1F1E6}", name: "Ukraine", short: "UA" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE", short: "AE" },
  { code: "+598", flag: "\u{1F1FA}\u{1F1FE}", name: "Uruguay", short: "UY" },
  { code: "+998", flag: "\u{1F1FA}\u{1F1FF}", name: "Uzbekistan", short: "UZ" },
  { code: "+58", flag: "\u{1F1FB}\u{1F1EA}", name: "Venezuela", short: "VE" },
  { code: "+84", flag: "\u{1F1FB}\u{1F1F3}", name: "Vietnam", short: "VN" },
  { code: "+967", flag: "\u{1F1FE}\u{1F1EA}", name: "Yemen", short: "YE" },
  { code: "+260", flag: "\u{1F1FF}\u{1F1F2}", name: "Zambia", short: "ZM" },
  { code: "+263", flag: "\u{1F1FF}\u{1F1FC}", name: "Zimbabwe", short: "ZW" },
]

// ==========================================================
// DATA MOCKS (From previous u2m.html)
// ==========================================================

const defaultMatchesData = [
  { name: "Mila", age: 26, lastSeen: "6h ago", avatar: "/images/male/tinder/5.jpg", verified: true, identity: "Bisexual", distance: "2 km", bio: "Part dreamer, part doer, all about good vibes. Ready to make some memories?", zodiac: "Virgo", mbti: "KU", passion: "Coffee", interests: ["Hiking", "Green Living", "Live Music", "Pottery"] },
  { name: "John", age: 25, lastSeen: "4h ago", avatar: "/images/female/tinder/5.jpg", verified: true, identity: "Bisexual", distance: "2 km", bio: "Half adrenaline junkie, half cozy blanket enthusiast. What’s your vibe?", zodiac: "Leo", mbti: "BU", passion: "Fitness", interests: ["Meditation", "Books", "Wine", "Music"] },
  { name: "Harper", age: 21, lastSeen: "3h ago", avatar: "/images/male/tinder/3.jpg", verified: false, identity: "Woman", distance: "5 km", bio: "Just a girl who loves sunsets and long walks on the beach. Looking for someone to share adventures with.", zodiac: "Leo", mbti: "UVA", passion: "Yoga", interests: ["Travel", "Photography", "Podcasts"] },
  { name: "Will", age: 23, lastSeen: "2h ago", avatar: "/images/female/tinder/3.jpg", verified: true, identity: "Man", distance: "8 km", bio: "Fluent in sarcasm and movie quotes. Let's find the best pizza place in town.", zodiac: "Gemini", mbti: "OHY", passion: "Baking", interests: ["Concerts", "Netflix", "Dogs"] },
  { name: "Luna", age: 24, lastSeen: "5h ago", avatar: "/images/male/tinder/6.jpg", verified: false, identity: "Woman", distance: "4 km", bio: "Night owl with a passion for stargazing. Let me show you the constellations.", zodiac: "Pisces", mbti: "INFP", passion: "Astronomy", interests: ["Space", "Photography", "Coffee"] },
  { name: "Alex", age: 28, lastSeen: "Online", avatar: "/images/female/tinder/6.jpg", verified: true, identity: "Man", distance: "3 km", bio: "Chef by profession, adventurer by heart. Always up for a new recipe or trail.", zodiac: "Scorpio", mbti: "ENFJ", passion: "Cooking", interests: ["Travel", "Food", "Hiking"] }
]

const femaleMatchesData = [
  { name: "Elizabeth", age: 24, lastSeen: "1h ago", avatar: "/images/male/tinder/1.jpg", verified: true, identity: "Woman", distance: "3 km", bio: "Seeking new adventures and a great cup of coffee. Let's explore the city together.", zodiac: "Aries", mbti: "ENFP", passion: "Traveling", interests: ["Art", "History", "Podcasts"] },
  { name: "Victoria", age: 27, lastSeen: "5h ago", avatar: "/images/male/tinder/2.jpg", verified: false, identity: "Woman", distance: "1 km", bio: "Bookworm and aspiring chef. Tell me about the last great book you read.", zodiac: "Taurus", mbti: "ISFJ", passion: "Cooking", interests: ["Reading", "Yoga", "Documentaries"] },
  { name: "Charlotte", age: 22, lastSeen: "Online", avatar: "/images/male/tinder/3.jpg", verified: true, identity: "Woman", distance: "6 km", bio: "Lover of live music and spontaneous road trips. What's our first destination?", zodiac: "Sagittarius", mbti: "ESFP", passion: "Music", interests: ["Concerts", "Photography", "Hiking"] },
  { name: "Emily", age: 25, lastSeen: "3h ago", avatar: "/images/male/tinder/4.jpg", verified: true, identity: "Woman", distance: "4 km", bio: "Fitness enthusiast who's equally happy on the couch with a good movie.", zodiac: "Virgo", mbti: "ISTJ", passion: "Fitness", interests: ["Movies", "Healthy Eating", "Dogs"] },
  { name: "Grace", age: 28, lastSeen: "8h ago", avatar: "/images/male/tinder/5.jpg", verified: false, identity: "Woman", distance: "7 km", bio: "Creative soul with a love for painting and poetry. Looking for meaningful conversations.", zodiac: "Pisces", mbti: "INFP", passion: "Art", interests: ["Museums", "Writing", "Coffee Shops"] },
  { name: "Olivia", age: 23, lastSeen: "2h ago", avatar: "/images/male/tinder/6.jpg", verified: true, identity: "Woman", distance: "2 km", bio: "Sarcasm is my second language. Let's find the best taco spot in town.", zodiac: "Gemini", mbti: "ENTP", passion: "Comedy", interests: ["Foodie", "Travel", "Stand-up"] }
]

const maleMatchesData = [
  { name: "William", age: 26, lastSeen: "Online", avatar: "/images/female/tinder/1.jpg", verified: true, identity: "Man", distance: "2 km", bio: "Engineer by day, musician by night. Let's talk about tech and tunes.", zodiac: "Capricorn", mbti: "INTJ", passion: "Guitar", interests: ["Technology", "Live Music", "Brewing"] },
  { name: "James", age: 29, lastSeen: "4h ago", avatar: "/images/female/tinder/2.jpg", verified: true, identity: "Man", distance: "5 km", bio: "Outdoors enthusiast looking for someone to hike with. My dog will probably like you.", zodiac: "Leo", mbti: "ESTP", passion: "Hiking", interests: ["Camping", "Dogs", "Bonfires"] },
  { name: "Henry", age: 25, lastSeen: "1h ago", avatar: "/images/female/tinder/3.jpg", verified: false, identity: "Man", distance: "3 km", bio: "Film buff and history nerd. Can recommend a movie for any mood.", zodiac: "Cancer", mbti: "INFJ", passion: "Movies", interests: ["History", "Reading", "Chess"] },
  { name: "Oliver", age: 27, lastSeen: "6h ago", avatar: "/images/female/tinder/4.jpg", verified: true, identity: "Man", distance: "8 km", bio: "Just a guy who enjoys good food, good company, and exploring new places.", zodiac: "Libra", mbti: "ESFJ", passion: "Foodie", interests: ["Travel", "Cooking", "Sports"] },
  { name: "Thomas", age: 30, lastSeen: "2h ago", avatar: "/images/female/tinder/5.jpg", verified: true, identity: "Man", distance: "4 km", bio: "Trying to find someone who won't steal my fries. Kidding... mostly.", zodiac: "Scorpio", mbti: "ISTP", passion: "Traveling", interests: ["Photography", "Motorcycles", "Gym"] },
  { name: "Edward", age: 24, lastSeen: "7h ago", avatar: "/images/female/tinder/6.jpg", verified: false, identity: "Man", distance: "6 km", bio: "Fluent in sarcasm and bad jokes. Looking for a partner in crime.", zodiac: "Aquarius", mbti: "ENTP", passion: "Gaming", interests: ["Comedy", "Sci-Fi", "Concerts"] }
]

const defaultCensoredPhotos = ["/images/censored/photo1.jpg", "/images/censored/photo2.jpg", "/images/censored/photo3.jpg", "/images/censored/photo4.jpg"]
const femaleCensoredPhotos = ["/images/male/tinder/censored/censored-f-1.jpg", "/images/male/tinder/censored/censored-f-2.jpg", "/images/male/tinder/censored/censored-f-3.jpg", "/images/male/tinder/censored/censored-f-4.jpg"]
const maleCensoredPhotos = ["/images/female/tinder/censored/censored-h-1.jpg", "/images/female/tinder/censored/censored-h-2.jpg", "/images/female/tinder/censored/censored-h-3.jpg", "/images/female/tinder/censored/censored-h-4.jpg"]

// ==========================================================

export default function DatingScanner() {
  const [step, setStep] = useState(1)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState<string | null>(null)
  const [relationshipStatus, setRelationshipStatus] = useState<string | null>(null)
  const [suspicionLevel, setSuspicionLevel] = useState<string | null>(null)
  const [redFlags, setRedFlags] = useState<string[]>([])
  const [imageUploaded, setImageUploaded] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [instagramUsername, setInstagramUsername] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const [igProfile, setIgProfile] = useState<{ username: string; full_name: string; profile_pic_url: string; follower_count: number; is_verified: boolean } | null>(null)
  const [igLoading, setIgLoading] = useState(false)
  const [igError, setIgError] = useState("")
  const [waPhoto, setWaPhoto] = useState<string | null>(null)
  const [waLoading, setWaLoading] = useState(false)
  const igDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const waDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [scanPhase, setScanPhase] = useState(0)
  const [location, setLocation] = useState("your city")
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null)
  const checkoutRef = useRef<HTMLDivElement>(null)

  const scrollToCheckout = useCallback(() => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  useEffect(() => {
    // Corrected location fetch
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (data.city) setLocation(data.city)
      })
      .catch((err) => console.log("Location fetch error", err))
  }, [])

  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00"
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string)
        setImageUploaded(true)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleInstagramChange = (value: string) => {
    setInstagramUsername(value)
    setIgProfile(null)
    setIgError("")

    if (igDebounceRef.current) clearTimeout(igDebounceRef.current)

    const clean = value.replace("@", "").trim()
    if (clean.length < 3) {
      setIgLoading(false)
      return
    }

    setIgLoading(true)
    igDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/instagram/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: clean }),
        })
        const data = await res.json()
        if (res.ok && data.success && data.profile) {
          setIgProfile(data.profile)
          setIgError("")
        } else {
          setIgError("Profile not found or private.")
        }
      } catch {
        setIgError("Connection error.")
      } finally {
        setIgLoading(false)
      }
    }, 1000)
  }

  const handleWhatsappChange = (value: string, country?: typeof countryCodes[0]) => {
    setWhatsappNumber(value)
    setWaPhoto(null)

    if (waDebounceRef.current) clearTimeout(waDebounceRef.current)

    const cleanPhone = value.replace(/\D/g, "")
    if (cleanPhone.length < 6) {
      setWaLoading(false)
      return
    }

    const cc = country || selectedCountry
    const fullPhone = cc.code.replace("+", "") + cleanPhone

    setWaLoading(true)
    waDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/whatsapp-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone }),
        })
        const data = await res.json()
        if (data.success && data.result) {
          setWaPhoto(data.result)
        }
      } catch {
        // silent fail - photo is optional enhancement
      } finally {
        setWaLoading(false)
      }
    }, 1500)
  }

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false)
        setCountrySearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const startInvestigation = () => {
    // Clear any previous timers
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []

    setStep(2)
    setScanPhase(0)
    setLoadingProgress(0)

    // Save survey responses for analytics (fire and forget)
    fetch('/api/survey-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gender: selectedGender,
        ageRange,
        relationshipStatus,
        suspicionLevel,
        redFlags,
        instagramUsername: instagramUsername.trim() || null,
        whatsappNumber: whatsappNumber.trim() || null,
        hasPhoto: imageUploaded
      })
    }).catch(() => {})

    // Simulate Loading with scan phases
    const scanSteps = [1, 2, 3, 4, 5]
    scanSteps.forEach((phase, i) => {
      const t = setTimeout(() => {
        setScanPhase(phase)
        setLoadingProgress(((i + 1) / scanSteps.length) * 80)
      }, (i + 1) * 1400)
      timersRef.current.push(t)
    })

    // Transition to intermediate results (step 2.5)
    const t1 = setTimeout(() => {
      setScanPhase(6)
      setLoadingProgress(100)
    }, 8000)
    timersRef.current.push(t1)

    // Transition to full results
    const t2 = setTimeout(() => {
      setStep(3)
    }, 13000)
    timersRef.current.push(t2)
  }

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(t => clearTimeout(t))
    }
  }, [])

  const getActiveData = () => {
    if (selectedGender === 'male') return { matches: femaleMatchesData, photos: femaleCensoredPhotos }
    if (selectedGender === 'female') return { matches: maleMatchesData, photos: maleCensoredPhotos }
    return { matches: defaultMatchesData, photos: defaultCensoredPhotos }
  }

  const { matches, photos } = getActiveData()

  const toggleRedFlag = (flag: string) => {
    setRedFlags(prev => prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag])
  }

  const hasAtLeastOneContact = imageUploaded || instagramUsername.trim().length > 0 || whatsappNumber.trim().length > 0
  const allQuestionsAnswered = selectedGender && ageRange && relationshipStatus && suspicionLevel && redFlags.length > 0 && hasAtLeastOneContact

  // --------------------------------------------------------
  // RENDER STEP 1: INPUT
  // --------------------------------------------------------
  const renderInputStep = () => (
    <div className="space-y-6 animate-fade-in w-full text-center">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#6C5CE7] to-[#7B6CF0] rounded-2xl p-8 mb-2 shadow-lg">
        {/* Wireless Icon */}
        <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="#6C5CE7" />
          </svg>
        </div>
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          🔍 Help Us Find What They&apos;re Hiding
        </h1>
        {/* Subtitle */}
        <p className="text-white/80 mt-3 text-sm sm:text-base">
          The more details you provide, the deeper we can dig. Everything stays 100% anonymous.
        </p>
      </div>

      {/* 1. Gender Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">What gender are they?</h2>
        <div className="grid grid-cols-3 gap-4">
          {['male', 'female', 'non-binary'].map(g => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`p-4 border rounded-xl transition-all duration-200 ${selectedGender === g ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <span className="text-4xl mb-2 block">{g === 'male' ? '👨🏻' : g === 'female' ? '👩🏻' : '🧑🏻'}</span>
              <span className="font-semibold text-gray-700 capitalize">{g.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          This helps us track their device activity and cross-reference with dating app usage patterns.
        </p>
      </div>

      {/* 2. Age Range */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">How old are they?</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '18-24', label: '18-24', emoji: '🧑' },
            { value: '25-34', label: '25-34', emoji: '👤' },
            { value: '35-44', label: '35-44', emoji: '🧔' },
            { value: '45+', label: '45+', emoji: '👴' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setAgeRange(opt.value)}
              className={`p-4 border rounded-xl transition-all duration-200 ${ageRange === opt.value ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <span className="text-2xl block mb-1">{opt.emoji}</span>
              <span className="font-semibold text-gray-700 text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Age helps us refine the search across the right dating platforms.
        </p>
      </div>

      {/* 3. Relationship Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">What&apos;s your current relationship status?</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'married', label: 'Married', emoji: '💍' },
            { value: 'relationship', label: 'In a relationship', emoji: '❤️' },
            { value: 'complicated', label: "It's complicated", emoji: '💔' },
            { value: 'dating', label: 'Just started dating', emoji: '🌱' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setRelationshipStatus(opt.value)}
              className={`p-4 border rounded-xl transition-all duration-200 text-left ${relationshipStatus === opt.value ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <span className="text-2xl block mb-1">{opt.emoji}</span>
              <span className="font-semibold text-gray-700 text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          This lets us calibrate our detection algorithms based on relationship patterns.
        </p>
      </div>

      {/* 3. Suspicion Level */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Have you noticed any suspicious behavior lately?</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { value: 'certain', label: "Yes, I'm almost certain", emoji: '🚨' },
            { value: 'gut', label: 'I have a gut feeling', emoji: '🤔' },
            { value: 'unsure', label: 'Not sure, but something feels off', emoji: '😟' },
            { value: 'checking', label: 'Just checking to be safe', emoji: '🔍' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setSuspicionLevel(opt.value)}
              className={`p-4 border rounded-xl transition-all duration-200 flex items-center gap-3 ${suspicionLevel === opt.value ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="font-semibold text-gray-700 text-sm text-left">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          You&apos;re not paranoid. Trust your instincts — we&apos;ll help you find the proof.
        </p>
      </div>

      {/* 4. Red Flags - Multi-select */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Which of these have you noticed?</h2>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'hide_phone', label: 'They hide their phone', emoji: '📱' },
            { value: 'changed_passwords', label: 'Changed passwords', emoji: '🔒' },
            { value: 'late_nights', label: 'Unexplained late nights', emoji: '🕐' },
            { value: 'deleting_messages', label: 'Deleting messages', emoji: '💬' },
            { value: 'emotionally_distant', label: 'Emotionally distant', emoji: '😶' },
            { value: 'appearance_change', label: 'Sudden appearance change', emoji: '👔' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => toggleRedFlag(opt.value)}
              className={`p-3 border rounded-xl transition-all duration-200 text-left ${redFlags.includes(opt.value) ? 'border-red-500 bg-red-50 ring-2 ring-red-300' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <span className="text-xl block mb-1">{opt.emoji}</span>
              <span className="font-semibold text-gray-700 text-xs">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Each red flag helps our system narrow down the search and find hidden profiles faster.
        </p>
      </div>

      {/* 5. Identification - Photo, Instagram, or WhatsApp */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Help Us Identify Them</h2>
        <p className="text-sm text-gray-500 mb-5">Provide at least <span className="font-semibold text-gray-700">one</span> of the options below so we can start the investigation.</p>

        {/* Photo Upload */}
        <div className={`border-2 rounded-xl p-4 mb-4 transition-all duration-200 ${imageUploaded ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${imageUploaded ? 'bg-green-500' : 'bg-gray-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={imageUploaded ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Upload Their Photo</p>
              <p className="text-xs text-gray-500">For facial recognition across dating platforms</p>
            </div>
          </div>
          <label className="w-full h-32 flex items-center justify-center border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors relative overflow-hidden">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {imagePreview ? (
              <img src={imagePreview} alt="Uploaded preview" className="w-full h-full object-cover absolute" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                <span className="text-xs text-gray-400">Tap to upload a photo</span>
              </div>
            )}
          </label>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-semibold text-gray-400 uppercase">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Instagram Input */}
        <div className={`border-2 rounded-xl p-4 mb-4 transition-all duration-200 ${igProfile ? 'border-pink-400 bg-pink-50' : instagramUsername.trim().length > 0 ? 'border-pink-300 bg-pink-50/50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${igProfile ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={igProfile ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Instagram Username</p>
              <p className="text-xs text-gray-500">We&apos;ll cross-reference their social activity</p>
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
            <input
              type="text"
              placeholder="username"
              value={instagramUsername}
              onChange={(e) => handleInstagramChange(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
            />
          </div>

          {/* Instagram Loading */}
          {igLoading && (
            <div className="flex items-center gap-2 mt-3 text-pink-500">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              <span className="text-xs font-medium">Searching profile...</span>
            </div>
          )}

          {/* Instagram Error */}
          {igError && !igLoading && (
            <p className="text-red-500 text-xs mt-2 font-medium">{igError}</p>
          )}

          {/* Instagram Profile Card */}
          {igProfile && !igLoading && (
            <div className="flex items-center gap-3 mt-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-300 flex-shrink-0 bg-gray-100">
                {igProfile.profile_pic_url ? (
                  <img src={igProfile.profile_pic_url} alt="Instagram profile" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1">
                  <p className="text-gray-900 font-bold text-sm truncate">@{igProfile.username}</p>
                  {igProfile.is_verified && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  )}
                </div>
                <p className="text-gray-500 text-xs truncate">{igProfile.full_name || ''}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{igProfile.follower_count?.toLocaleString()} followers</p>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs font-semibold text-gray-400 uppercase">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* WhatsApp Input */}
        <div className={`border-2 rounded-xl p-4 transition-all duration-200 ${waPhoto ? 'border-green-400 bg-green-50' : whatsappNumber.trim().length > 0 ? 'border-green-300 bg-green-50/50' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${waPhoto ? 'bg-green-500' : 'bg-gray-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={waPhoto ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">WhatsApp Number</p>
              <p className="text-xs text-gray-500">We&apos;ll scan linked dating app accounts</p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Country Code Selector */}
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => { setShowCountryDropdown(!showCountryDropdown); setCountrySearch("") }}
                className="flex items-center gap-1.5 px-3 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white hover:bg-gray-50 transition-colors min-w-[100px] justify-between focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
              >
                <span className="text-base leading-none">{selectedCountry.flag}</span>
                <span className="font-medium">{selectedCountry.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* Search */}
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-300"
                      autoFocus
                    />
                  </div>
                  {/* List */}
                  <div className="max-h-52 overflow-y-auto">
                    {countryCodes
                      .filter(c => {
                        if (!countrySearch.trim()) return true
                        const q = countrySearch.toLowerCase()
                        return c.name.toLowerCase().includes(q) || c.code.includes(q) || c.short.toLowerCase().includes(q)
                      })
                      .map((c, i) => {
                        // Add separator before non-English-speaking countries
                        const showSeparator = i === 0 ? false : !countrySearch.trim() && i === 15
                        return (
                          <div key={`${c.short}-${i}`}>
                            {showSeparator && (
                              <div className="px-3 py-1.5 bg-gray-50 border-y border-gray-100">
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Other Countries</span>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c)
                                setShowCountryDropdown(false)
                                setCountrySearch("")
                                if (whatsappNumber.trim()) handleWhatsappChange(whatsappNumber, c)
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-green-50 transition-colors ${selectedCountry.short === c.short && selectedCountry.code === c.code ? 'bg-green-50' : ''}`}
                            >
                              <span className="text-base leading-none">{c.flag}</span>
                              <span className="flex-1 text-sm text-gray-800 truncate">{c.name}</span>
                              <span className="text-xs text-gray-500 font-mono">{c.code}</span>
                            </button>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder="Phone number"
              value={whatsappNumber}
              onChange={(e) => handleWhatsappChange(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all"
            />
          </div>

          {/* WhatsApp Loading */}
          {waLoading && (
            <div className="flex items-center gap-2 mt-3 text-green-500">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              <span className="text-xs font-medium">Looking up profile photo...</span>
            </div>
          )}

          {/* WhatsApp Profile Photo Card */}
          {waPhoto && !waLoading && (
            <div className="flex items-center gap-3 mt-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-300 flex-shrink-0 bg-gray-100">
                <img src={waPhoto} alt="WhatsApp profile" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-gray-900 font-bold text-sm">WhatsApp Profile</p>
                <p className="text-gray-500 text-xs truncate">{selectedCountry.code} {whatsappNumber}</p>
                <p className="text-green-600 text-[10px] mt-0.5 font-medium">Profile photo found</p>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-5">We&apos;ll scan across all dating platforms to find matching profiles - even ones they think are hidden.</p>
      </div>

      <button
        onClick={startInvestigation}
        disabled={!allQuestionsAnswered}
        className="w-full text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <span>START INVESTIGATION - FIND THE TRUTH</span>
      </button>
    </div>
  )

  // --------------------------------------------------------
  // RENDER STEP 2: LOADING
  // --------------------------------------------------------
  const scanStepsData = [
    { label: 'Tinder, Bumble, Hinge scanning', icon: '🔥' },
    { label: 'Facial recognition processing', icon: '🧠' },
    { label: 'Location data analysis', icon: '📍' },
    { label: 'Message history detection', icon: '💬' },
    { label: 'Profile cross-reference complete', icon: '✅' },
  ]

  const scanStatusMessages = [
    'Initializing scan...',
    'Checking Tinder activity in your area...',
    'Running facial recognition...',
    'Analyzing location patterns...',
    'Scanning message history...',
    'Finalizing results...',
  ]

  const renderLoadingStep = () => {
    // Phase 6 = intermediate results screen
    if (scanPhase === 6) {
      return (
        <div className="animate-fade-in w-full text-center space-y-5">
          {/* Header */}
          <div className="bg-gradient-to-b from-[#6C5CE7] to-[#7B6CF0] rounded-2xl p-8 shadow-lg">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-md">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              We Found What You Were Looking For...
            </h1>
          </div>

          {/* Alert Card */}
          <div className="bg-red-50 border-2 border-red-200 p-5 rounded-2xl text-left">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <h2 className="font-bold text-red-700 text-lg">ACTIVE DATING PROFILES DETECTED</h2>
            </div>
            <p className="text-red-600 text-sm">
              Our system discovered multiple active profiles linked to this person across 3 different dating platforms.
            </p>
          </div>

          {/* Findings */}
          <div className="bg-white rounded-2xl shadow-lg p-5 text-left space-y-5">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">Last Active: 18 hours ago</p>
                <p className="text-sm text-gray-500">Despite claiming they &lsquo;deleted everything&rsquo;</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">3 Dating Apps Currently Active</p>
                <p className="text-sm text-gray-500">Tinder, Bumble, and one premium platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">Recent Conversations Detected</p>
                <p className="text-sm text-gray-500">Active messaging with multiple matches this week</p>
              </div>
            </div>
          </div>

          {/* What you'll see */}
          <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-blue-800">What You&apos;ll See in the Full Report:</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Screenshots of all active profiles</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Recent conversations and what they&apos;re saying</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Exact locations where they&apos;ve been swiping</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Timeline of all activity (you&apos;ll be shocked)</li>
            </ul>
          </div>

          {/* Loading to results */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="w-4 h-4 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
            </div>
            <span>Preparing your complete report...</span>
          </div>

          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Secure and encrypted connection · No traces left behind
          </p>
        </div>
      )
    }

    // Scanning animation (phases 0-5)
    return (
      <div className="animate-fade-in w-full text-center space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#6C5CE7] to-[#7B6CF0] rounded-2xl p-8 shadow-lg">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            🔍 Scanning All Dating Platforms...
          </h1>
          <p className="text-white/70 mt-2 text-sm">
            {scanStatusMessages[Math.min(scanPhase, scanStatusMessages.length - 1)]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#6C5CE7] to-[#a78bfa] h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{Math.min(Math.round(loadingProgress), 100)}% complete</p>
        </div>

        {/* Scan Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-left">
          <div className="space-y-4">
            {scanStepsData.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${scanPhase > i ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${scanPhase > i
                    ? 'bg-green-100 text-green-600'
                    : scanPhase === i + 1
                      ? 'bg-purple-100 text-purple-600 animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                  {scanPhase > i ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{s.icon}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${scanPhase > i ? 'text-green-700' : scanPhase === i + 1 ? 'text-gray-800' : 'text-gray-400'
                  }`}>{s.label}</span>
                {scanPhase === i + 1 && (
                  <div className="ml-auto w-4 h-4 animate-spin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Secure and encrypted connection · No traces left behind
        </p>
      </div>
    )
  }

  // --------------------------------------------------------
  // RENDER STEP 3: RESULTS
  // --------------------------------------------------------
  const renderResultsStep = () => (
    <div className="space-y-4 animate-fade-in w-full text-left">

      {/* Alert Banners */}
      <div className="bg-red-600 text-white p-3 rounded-lg shadow-lg flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
        <div>
          <h1 className="font-bold text-base">PROFILE FOUND - THEY ARE ACTIVE ON TINDER</h1>
          <p className="text-xs text-red-200">Last seen: <span className="font-semibold">Online now</span></p>
        </div>
      </div>

      <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 shrink-0" />
        <p className="text-sm font-semibold">
          <span className="font-bold">ATTENTION: ACTIVE PROFILE FOUND!</span> We confirm this number is linked to an ACTIVE Tinder profile. Latest usage records detected in <span className="font-bold">{location}</span>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 text-center">
        {[
          { val: 6, label: "MATCHES (7 DAYS)", color: "text-red-600" },
          { val: 30, label: "LIKES (7 DAYS)", color: "text-orange-500" },
          { val: 4, label: "ACTIVE CHATS", color: "text-purple-600" },
          { val: "18h", label: "LAST ACTIVE", color: "text-gray-800" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-md">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-gray-500 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Matches List */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-5 rounded-lg shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.3.3.5.6.8.9.6.6 2 .9 2.1 2.9z" /></svg>
          <h2 className="text-lg font-bold">RECENT MATCHES FOUND</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">Tap on a match to view more information</p>
        <div className="space-y-4">
          {matches.slice(0, 3).map((m, i) => (
            <div key={i} onClick={() => setSelectedMatch(m)} className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" onError={(e) => e.currentTarget.src = '/placeholder.svg'} />
              <div className="flex-grow">
                <p className="font-bold">{m.name}, {m.age}</p>
                <p className="text-xs text-gray-400">Last seen: {m.lastSeen}</p>
                <p className="text-xs font-semibold text-green-400">Active chat: frequently online</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-5 rounded-lg shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold">RECENT CHATS</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">Tap on a conversation to read their messages</p>
        <div className="space-y-4">
          {matches.slice(3, 6).map((m, i) => (
            <div
              key={i}
              onClick={scrollToCheckout}
              className="flex items-center gap-4 bg-slate-700/50 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
            >
              <div className="relative">
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" onError={(e) => e.currentTarget.src = '/placeholder.svg'} />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold">{m.name}</p>
                <p className="text-sm text-blue-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
                  Click to read messages...
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-gray-400">Just now</span>
                <span className="text-gray-500">⋮</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Censored Photos Carousel */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white p-5 rounded-lg shadow-2xl relative">
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
          <h2 className="text-lg font-bold">CENSORED PHOTOS</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4">See all their profile photos (including the ones you've never seen)</p>

        <div className="flex overflow-x-auto gap-2 scrollbar-hide snap-x">
          {photos.map((src, i) => (
            <div key={i} className="relative flex-[0_0_85%] aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden snap-center">
              <img src={src} className="w-full h-full object-cover filter blur-md" onError={(e) => e.currentTarget.src = '/placeholder.svg'} />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                <Lock className="w-8 h-8" />
                <span className="font-bold mt-1 text-sm tracking-widest">BLOCKED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock Widget */}
      <div ref={checkoutRef} className="bg-white p-5 rounded-lg shadow-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center mb-4">
          <LockOpen className="text-white w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800"><span className="text-yellow-600">🔓</span> UNLOCK COMPLETE REPORT</h2>
        <p className="text-gray-600 mt-1">Get instant access to the full report with all the matches and photos exchanged</p>

        <div className="bg-red-100 border-2 border-red-500 text-red-800 p-4 rounded-lg mt-5 mb-5">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="text-red-600 w-5 h-5" />
            <h3 className="font-bold">THE REPORT WILL BE DELETED IN:</h3>
          </div>
          <p className="text-4xl font-mono font-bold my-1">{formatTime(timeLeft)}</p>
          <p className="text-xs text-red-700">After the time expires, this report will be permanently deleted for privacy reasons. This offer cannot be recovered at a later date.</p>
        </div>

        {/* CHECKOUT BUTTON - Retained from original file */}
        <a
          href="https://pay.mycheckoutt.com/0198c1be-98b4-7315-a3bc-8c0fa9120e5c?ref="
          onClick={() => {
            const userGender = selectedGender === 'male' ? 'female' : selectedGender === 'female' ? 'male' : undefined;
            trackInitiateCheckout(37, 'USD', { gender: userGender });
          }}
          className="mt-6 block w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          🔓 YES, I WANT THE COMPLETE REPORT
        </a>

        {/* Testimonial */}
        <div className="mt-6 flex items-start gap-3 text-left bg-gray-50 p-4 rounded-xl">
          <img
            src={selectedGender === 'female' ? '/images/p3.jpg' : '/images/86.jpg'}
            alt="Verified user"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800 text-sm">
                {selectedGender === 'female' ? 'James W.' : 'Sarah M.'}
              </p>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                <CheckCircle className="w-3.5 h-3.5" /> Verified User
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-1 italic">
              &ldquo;I wish I had done this months ago. Would have saved me so much anxiety and wasted time.&rdquo;
            </p>
            <p className="mt-1 text-yellow-500 text-sm tracking-wider">⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>
    </div>
  )

  // --------------------------------------------------------
  // MATCH DETAIL MODAL
  // --------------------------------------------------------
  const renderMatchModal = () => {
    if (!selectedMatch) return null;
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedMatch(null)}>
        <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSelectedMatch(null)} className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
          </button>
          <img src={selectedMatch.avatar} alt="Match" className="w-full h-80 object-cover rounded-t-2xl" />
          <div className="p-5 text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">{selectedMatch.name}</h1>
              {selectedMatch.verified && <CheckCircle className="text-blue-500 w-7 h-7" fill="white" />}
            </div>
            <div className="flex flex-col gap-1 text-gray-600 mt-2 text-sm">
              <div className="flex items-center gap-1.5"><p>{selectedMatch.identity}</p></div>
              <div className="flex items-center gap-1.5"><p>Lives in {location}</p></div>
              <div className="flex items-center gap-1.5"><p>📍 {selectedMatch.distance} away</p></div>
            </div>
            <div className="mt-6">
              <h2 className="font-bold text-gray-800">About Me</h2>
              <p className="text-gray-600 mt-1">{selectedMatch.bio}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              {[selectedMatch.zodiac, selectedMatch.mbti, selectedMatch.passion].map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="font-bold text-gray-800">My Interests</h2>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                {selectedMatch.interests.map((int: string, i: number) => (
                  <span key={i} className="border border-gray-300 text-gray-700 px-3 py-1 rounded-full">{int}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 grid grid-cols-2 gap-4 bg-white p-4 border-t border-gray-200">
            <button onClick={() => setSelectedMatch(null)} className="bg-gray-200 text-gray-800 font-bold py-3 rounded-full hover:bg-gray-300 transition-colors">Pass</button>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity">Like</button>
          </div>
        </div>
      </div>
    )
  }

  // --------------------------------------------------------
  // MAIN RENDER
  // --------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <main className="w-full max-w-md mx-auto">
        {step === 1 && renderInputStep()}
        {step === 2 && renderLoadingStep()}
        {step === 3 && renderResultsStep()}
      </main>
      <footer className="py-4 mt-4">
        <p className="text-xs text-gray-500">© 2024. All rights reserved.</p>
      </footer>
      {renderMatchModal()}
    </div>
  )
}
