/*
  ============================================================
  WEDDING DETAILS (Vrindavan edition) — edit everything here.
  Taken from the printed card (Parinay Pati) and written in English.
  ============================================================
*/
window.WEDDING = {
  groom: {
    firstName: "Somesh",
    fullName: "Somesh Chhangani",
    honorific: "चि.",
    qualification: "BA LLB, CS",
    lines: [
      "Son of Dr. Smt. Rachna Shailendra Chhangani",
      "Grandson of Smt. Basantidevi & Shri Ramchandra Chhangani",
      "Maternal grandson of Smt. Vimladevi & late Shri Rameshchandra Jain (Badola)"
    ],
    photo: "images/groom.jpg?v=4"
  },
  bride: {
    firstName: "Diksha",
    fullName: "Diksha Thanvi",
    honorific: "सौ. कां.",
    qualification: "CA",
    lines: [
      "Daughter of Smt. Payalji – Rameshji Thanvi",
      "Granddaughter of late Smt. Bhawridevi & late Shri Hiralal Thanvi",
      "Maternal granddaughter of late Smt. Satyabhama & Shri Kishangopal Purohit (Jodhpur)"
    ],
    photo: "images/bride.jpg?v=3"
  },

  monogram: "S & D",
  hashtag: "#SomeshWedsDiksha",
  // Countdown to the Panigrahan Sanskar (Indian time)
  countdownTo: "2026-12-11T18:30:00+05:30",
  headlineDate: "11 · 12 · 2026",
  familyName: "Chhangani",

  invocations: ["॥ श्री गणेशाय नमः ॥", "॥ श्री रामदेवाय नमः ॥", "॥ श्री सच्चियाय माता नमः ॥", "॥ जय भोले नाथ ॥"],
  introLines: [
    "In the auspicious hour of marriage, two hearts are tied together and a new life begins.",
    "It comes with God's infinite grace and the blessings of our elders; with your love and blessings, this celebration becomes truly blessed.",
    "Come, be part of this sacred moment and bless the couple, that their life together is joyful and full of light."
  ],

  // The card's own poem, shown over the close-up of Radha & Krishna's hands
  poem: {
    hindi: ["दो दिलों का पावन बंधन,", "सज गया है प्रेम का आंगन,", "शुभ आशिषों की छाँव तले,", "खिल उठे हैं जीवन के सपने।"],
    english: "A sacred bond of two hearts; love's courtyard is adorned. Under the shade of your blessings, the dreams of a lifetime bloom."
  },

  // Shown over the couple's joined hands: the Panigrahan mantra (Rig Veda 10.85.36),
  // recited at the wedding as the groom takes the bride's hand
  shloka: {
    sanskrit: ["गृभ्णामि ते सौभगत्वाय हस्तं", "मया पत्या जरदष्टिर्यथासः ।"],
    english: "I take your hand in mine, for our good fortune, that we may grow old together.",
    ref: "The Panigrahan mantra · Rig Veda"
  },

  // WhatsApp number for RSVPs: country code + number, no spaces or +
  rsvpWhatsApp: "917709001744",
  rsvpBy: "30 November 2026",
  // "Radha Ramanam Hare Hare" (Shri Indresh Upadhyay Ji, BhaktiPath), a 75-second loop
  music: "audio/radha-ramanam.m4a",

  // The celebrations, day by day. mapUrl: paste the Google Maps "Share" link.
  days: [
    {
      id: "d1", label: "Day I", date: "2026-12-07", place: "Nagpur",
      venue: "Our home · Flat 206, Shiv Residency Apt. 1, Barde Layout, Borgaon, Nagpur",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Shiv%20Residency%201%2C%2051%20Katol%20Rd%2C%20Nagpur",
      events: [
        { id: "yagyopavit", key: true, time: "9:00 AM", name: "Yagyopavit Sanskar", hindi: "यज्ञोपवीत संस्कार", note: "The sacred-thread ceremony of Chi. Somesh and Chi. Hitesh (Ashutosh), with the blessings of late Pt. Jethmalji & Smt. Yashodadevi Chhangani" },
        { id: "mangalgeet", time: "6:00 PM", name: "Mangal Geet", hindi: "मंगलगीत", note: "An evening of auspicious songs" }
      ]
    },
    {
      id: "d2", label: "Day II", date: "2026-12-08", place: "Nagpur",
      venue: "Our home · Flat 206, Shiv Residency Apt. 1, Barde Layout, Borgaon, Nagpur",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Shiv%20Residency%201%2C%2051%20Katol%20Rd%2C%20Nagpur",
      events: [
        { id: "mehendi", key: true, time: "9:00 AM", name: "Mehendi", hindi: "मेहंदी", note: "Come with your family and fill the day with song" },
        { id: "prasthan", time: "10:00 PM", name: "Baraat Prasthan", hindi: "बारात प्रस्थान", note: "The baraat leaves Nagpur by train for Jodhpur, to the home of Shri Devkinandanji & Shri Rameshji Thanvi" }
      ]
    },
    {
      id: "d3", label: "Day III", date: "2026-12-10", place: "Jodhpur",
      venue: "Hotel Samaroh Green · near Anutam Palace, Dalibai Circle, Jaisalmer Bypass Road, Jodhpur",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Samaroh%20Greens%2C%20Jaisalmer%20Bypass%2C%20near%20Dalibai%20Circle%2C%20Jodhpur",
      events: [
        { id: "ganesh", time: "8:00 AM", name: "Ganesh Sthapana", hindi: "गणेश स्थापना" },
        { id: "samela", time: "10:00 AM", name: "Samela · Haldi", hindi: "समेला · हल्दी" },
        { id: "hathkaam", time: "12:00 PM", name: "Hathkaam", hindi: "हथकाम" },
        { id: "mayra", time: "3:00 PM", name: "Mayra", hindi: "मायरा" },
        { id: "sangeet", key: true, time: "5:00 PM", name: "Sangeet Sandhya", hindi: "संगीत संध्या" },
        { id: "jaan", time: "9:30 PM", name: "Jaan Jeeman", hindi: "जान जीमण" }
      ]
    },
    {
      id: "d4", label: "Day IV", date: "2026-12-11", place: "Jodhpur",
      venue: "Hotel Samaroh Green · near Anutam Palace, Dalibai Circle, Jaisalmer Bypass Road, Jodhpur",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=Samaroh%20Greens%2C%20Jaisalmer%20Bypass%2C%20near%20Dalibai%20Circle%2C%20Jodhpur",
      events: [
        { id: "snehmilan", time: "10:00 AM", name: "Sneh Milan", hindi: "स्नेह मिलन" },
        { id: "nikasi", time: "4:30 PM", name: "Baraat Nikasi", hindi: "बारात निकासी" },
        { id: "panigrahan", key: true, time: "6:30 PM", name: "Panigrahan Sanskar", hindi: "पाणिग्रहण संस्कार", note: "Vikram Samvat 2083, Margashirsha Shukla Dwitiya", highlight: true }
      ]
    },
    {
      id: "d5", label: "Day V", date: "2026-12-14", place: "Nagpur",
      venue: "New Chopde Lawns · Awasthi Chowk, Jafar Nagar, Nagpur",
      mapUrl: "https://www.google.com/maps/dir/?api=1&destination=New%20Chopde%20Lawns%2C%20Awasthi%20Square%2C%20Jafar%20Nagar%2C%20Nagpur",
      events: [
        { id: "ashirwad", key: true, time: "6:30 PM onwards", name: "Ashirwad Samaroh", hindi: "आशीर्वाद समारोह", note: "Bless our dear son Chi. Somesh and our dear daughter-in-law Sau. Diksha", highlight: true }
      ]
    }
  ],

  // Separate links: add ?g=<group> to the address, e.g. yoursite.com/?g=nagpur
  guestGroups: {
    nagpur: ["yagyopavit", "mangalgeet", "mehendi", "prasthan", "ashirwad"],
    jodhpur: ["ganesh", "samela", "hathkaam", "mayra", "sangeet", "jaan", "snehmilan", "nikasi", "panigrahan"],
    reception: ["ashirwad"],
    // Guests coming to both Nagpur and Jodhpur: every ceremony
    both: ["yagyopavit", "mangalgeet", "mehendi", "prasthan", "ganesh", "samela", "hathkaam", "mayra", "sangeet", "jaan", "snehmilan", "nikasi", "panigrahan", "ashirwad"]
  },

  families: {
    vineet: [
      "Smt. Basantidevi – Shri Ramchandra Chhangani",
      "Smt. Santoshdevi – Shri Somchand (Munnabhai) Chhangani",
      "Smt. Ashadevi – Shri Kamalkishore Chhangani",
      "Smt. Anjanadevi – Shri Rooplal (Lalit) Chhangani",
      "Smt. Maithili – Shri Nitin Chhangani"
    ],
    darshanabhilashi: "Chi. Hitesh (Ashutosh) Chhangani (CS)",
    manuhar: "Jinal & Radha Chhangani",
    signOff: "The Chhangani family",
    mama: [
      "late Smt. Gunmala – late Shri Dilipkumarji Jain",
      "Smt. Karuna – Shri Pradeepkumarji Jain",
      "Smt. Santosh – Shri Ashokkumarji Jain",
      "Smt. Alka – late Shri Atulkumarji Jain",
      "Smt. Roopalata – Shri Anandprakashji Jain",
      "Smt. Sangeeta – Shri Rajeshkumarji Jain"
    ],
    mamaNote: "(Badola)",
    masi: [
      "Dr. Smt. Nanda – Dr. Shri Prasannaji Redasani (Jalgaon)",
      "Dr. Smt. Varsha – Dr. Shri Anilkumarji Lunkad (Dhamtari)",
      "Dr. Smt. Mamta – Dr. Shri Chandrakantji Dungarwal (Ahilyanagar)",
      "Dr. Smt. Preeti – Shri Hemantkumarji Chhajed (USA)"
    ],
    shobha: [
      "late Smt. Pushpadevi – Shri Babulalji Joshi",
      "Smt. Durgadevi – late Shri Omprakashji Purohit",
      "Smt. Madhuri – late Shri Manojkumarji Vyas",
      "Smt. Nita – Shri Bharatji Thanvi",
      "Smt. Neelam – Shri Dilipkumarji Vyas",
      "Smt. Khushboo – Shri Arunkumarji Vyas",
      "Smt. Komal – Shri Gopalji Vyas",
      "Smt. Garima – Shri Govindji Maniyar",
      "Smt. Pooja – Shri Krishnakantji Bohra",
      "Smt. Bhavna – Shri Devashishji Jethmal",
      "Smt. Radhika – Shri Romilji Jain"
    ],
    bagiya: ["Diya (Reva)", "Vedant", "Raghav", "Yash", "Kanak", "Dhruv", "Viraj", "Krishna", "Lakshansh", "Lavanya", "Mrityunjay", "Ditya", "Rudrika", "Satvik"]
  },

  contacts: [
    { name: "Somchand (Munnabhai)", phone: "9322810308" },
    { name: "Rooplal (Lalit)", phone: "9970165864" },
    { name: "Shailendra", phone: "9284658869" },
    { name: "Nitin", phone: "9975709018" },
    { name: "Hitesh (Ashutosh)", phone: "7709001744" }
  ],
  sender: {
    lines: ["Shri Somchand (Munnabhai) Jethmalji Chhangani", "Shailendra Ramchandraji Chhangani", "Ramdev Baba Tekdi, Katol Road, Nagpur 440013"],
    practice: "Ramdev Clinic, Gittikhadan, Nagpur"
  }
};
