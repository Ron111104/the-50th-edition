// Every word on the site lives here. Edit freely; the layout adapts.
// Photo names refer to files in /photos (see photos/meta.json).

export const issue = {
  name: "Mukesh",
  born: "15 November 1976",
  date: "15 November 2026",
  number: 50,
  from: "Ronak",
  music: "/audio/raabta.mp3", // the song file in public/audio/
  musicTitle: "Raabta",
};

export const cover = {
  photo: "yellow-kurta",
  kicker: "The 50th Edition",
  lines: [
    { title: "Fifty years of looking after everyone", id: "profile" },
    { title: "Inside his portfolio: the fund that never stops growing", id: "portfolio" },
    { title: "Style file: the turban, the bandhgala, the sunglasses", id: "style" },
  ],
  price: "Priceless",
};

// Order here = order in the magazine. Page numbers are generated
// (cover is page 1, contents page 2, so the first entry is page 3).
export const contents = [
  { id: "profile", title: "Mukesh at fifty", deck: "Three things he always does.", photo: "with-mom-close" },
  { id: "portfolio", title: "The portfolio", deck: "A fund review, as he would want it.", photo: "formal-trio" },
  { id: "archives", title: "From the archives", deck: "Two prints from the family album.", photo: "archive-couple" },
  { id: "style", title: "Style file", deck: "Turbans, bandhgalas and the yellow that started it.", photo: "home-festive" },
  { id: "travel", title: "Travel desk", deck: "From the London Eye to Pattaya.", photo: "london-eye" },
  { id: "snapped", title: "Seen and snapped", deck: "The society pages. Wigs included.", photo: "party-wigs" },
  { id: "wife", title: "To my wonderful husband", deck: "A letter from Mom, in her own words.", photo: "black-outfits" },
];

export const letter = {
  photo: "garden-trio",
  caption: "Family, in the garden.",
  // PLACEHOLDER: replace these paragraphs with Ronak's 150-word letter.
  // Keep each paragraph as a separate string.
  paragraphs: [
    "Dad, this is a placeholder for my letter to you. The real one is about a hundred and fifty words long, and it will go right here, in the most important column of this issue.",
    "Until then, know that every page after this one was made for you, from photos you probably forgot were taken.",
  ],
  signoff: "Ronak",
};

export const profile = {
  photo: "with-mom-close",
  headline: "Mukesh at fifty",
  standfirst: "Born on 15 November 1976. Fifty years later, three things haven't changed.",
  traits: [
    { word: "Caring", line: "Before anything else, he makes sure everyone around him is looked after.", photo: "family-hug" },
    { word: "Food", line: "A good meal is never just a meal. It's the best part of the day, shared.", photo: "dinner-sizzler" },
    { word: "Mutual funds", line: "Patient, disciplined and always in it for the long run.", photo: "formal-trio" },
  ],
};

export const portfolio = {
  fund: "The Mukesh Family Growth Fund",
  plan: "Direct plan, growth option",
  facts: [
    { k: "Inception", v: "15 Nov 1976" },
    { k: "Fund manager", v: "Mukesh" },
    { k: "Co-manager", v: "Mom" },
    { k: "Strategy", v: "Daily SIP of care" },
    { k: "Exit load", v: "Not applicable. Nobody leaves." },
    { k: "Risk", v: "Low. He has checked twice." },
  ],
  allocation: [
    { k: "Family", v: 45 },
    { k: "Good food", v: 25 },
    { k: "Friends", v: 15 },
    { k: "Mutual funds", v: 15 },
  ],
  verdict: "Fifty years of compounding. Rating: five stars, held forever.",
  disclaimer: "Past performance is a very good indicator of future performance.",
};

export const archives = {
  intro: "Before the phones, there were prints.",
  photos: [
    { photo: "archive-couple", caption: "From the family album" },
    { photo: "archive-family", caption: "From the family album" },
  ],
};

export const style = {
  hero: { photo: "yellow-kurta", credit: "Yellow bandhgala, red safa, white churidar." },
  looks: [
    { photo: "home-festive", credit: "Grey trousers, white shirt, festive company." },
    { photo: "family-hug", credit: "White shirt, everyone in their finest." },
    { photo: "formal-trio", credit: "Formal white, kept simple." },
    { photo: "family-event", credit: "Crisp white, front row at the function." },
  ],
};

export const travel = {
  stops: [
    { photo: "london-eye", place: "London", note: "Top of the Eye, Westminster behind." },
    { photo: "pattaya", place: "Pattaya", note: "With the boys, after dark." },
    { photo: "the-sphere", place: "London, again", note: "Holding up the sculpture, single-handed." },
    { photo: "football-mural", place: "Location unconfirmed", note: "Still in the starting eleven." },
  ],
};

export const snapped = {
  intro: "Who wore it, who ate it, who brought the wigs.",
  photos: [
    { photo: "party-wigs", caption: "Three men, three wigs, zero regrets.", back: "Editor's note: the magazine declined to comment." },
    { photo: "friends-group", caption: "Outnumbered, and happy about it." },
    { photo: "garden-trio", caption: "A garden, a sunny day." },
    { photo: "selfie-four", caption: "Everyone in frame." },
  ],
};

// Mom's letter, word for word (emojis left out for print; restore them here if wanted).
export const wife = {
  photos: [
    { photo: "archive-couple", caption: "Then." },
    { photo: "black-outfits", caption: "Now." },
  ],
  kicker: "A golden celebration of love, togetherness and achievements",
  greeting: "Happy 50th birthday!",
  to: "To my wonderful husband",
  prayer: "Thithayara mein pasiyanthu siddha sidhim sarve disanthu",
  prayerMeaning: "May all your wishes and aspirations be fulfilled, and may success and happiness come to you from every direction.",
  paragraphs: [
    "On this very special day, I wish you, wholeheartedly, a truly amazing 50th birthday!",
    "It has been more than 20 beautiful years that we have travelled this journey together. Through all these years, we have witnessed countless hurdles, hiccups and challenges. Yet, with acceptance, patience and a whole lot of love, we stood together, grew together and moved forward, one step at a time.",
    "And finally, here we are, having achieved so much together!",
    "Life, however, had its own challenges. For the past four years, my health has been affected by CKD. During this difficult phase, you stood firmly beside me, without hesitation, giving me the courage, confidence and strength to fight back and recover. Your unwavering support is something I will always cherish.",
  ],
  roles: [
    "As a father, you are simply marvellous, and our son is truly blessed to have you.",
    "As a husband, you are spectacular, loving and dependable.",
    "As a son and brother, you have always stood by your family whenever they needed you.",
    "And not to forget, you have extended the same care, love and support to your wife's family whenever they needed you.",
  ],
  afterRoles: "You have truly played every role in life with commitment, responsibility and a heart full of love.",
  pullQuote: "To sum it all up, you are a rare GEM, a beautiful DIAMOND!",
  closingParagraphs: [
    "Just like a diamond, whose brilliance and sparkle emerge through pressure and polishing, your true worth has shone through every challenge life has placed before you.",
    "You have proved that life's hurdles don't diminish one's shine; they only make the sparkle brighter!",
    "As you step into your golden 50s, may life bless you with abundant happiness, good health, peace, prosperity and countless beautiful moments.",
    "May the years ahead be filled with everything your heart deserves.",
    "Keep shining, keep smiling and keep being the wonderful person you are!",
  ],
  signoff: "With endless love, gratitude and admiration.",
  finale: "Happy golden 50th birthday, my dear!",
  grateful: "Forever grateful to walk this beautiful journey of life with you.",
  motto: ["Strength", "Love", "Commitment", "Brilliance"],
  sparkle: "May your life continue to sparkle like the precious diamond you are!",
};

export const backCover = {
  headline: "Happy 50th, Dad.",
  line: "Phir se ud chala.",
  closing: "Issue 50 ends here. Issue 51 starts tomorrow.",
};

export const pageOf = (id) => String(contents.findIndex((c) => c.id === id) + 3).padStart(2, "0");
