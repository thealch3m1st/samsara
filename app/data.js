// Content mapped from "The Tibetan Book of the Dead"
// (Penguin Classics Deluxe Edition, trans. Gyurme Dorje & Graham Coleman)

const WHEEL_DATA = {
  deva: {
    name: "Deva Realm",
    subtitle: "The God Realm",
    modern: "curated wellness, influencer paradise, effortless privilege",
    poison: "Pride",
    sage: "Sakra, white, playing a lute",
    light: "A dull white light",
    color: "#e9d48b",
    bookTitle: "Six Lights at the Intermediate State of Rebirth",
    page: "p. 279",
    passages: [
      {
        page: "p. 279",
        text: "A dull white light indicative of the realm of the gods will arise… At this time, your [present] body will take on the colour of the light of the realm into which you are to be born."
      },
      {
        page: "p. 100",
        text: "Amidst an expanse of light in the channel branch of the energy centre of great bliss at one's crown, within a radiant and vibrant maṇḍala, that is a lustrous white seminal point, stands Sakra, sage of the god realms, white in colour, and playing a lute. May he obstruct pride, which is the entrance to rebirth in the god realms!"
      },
      {
        page: "p. 235",
        text: "Do not delight in the dull white light of the god realms! Do not be attached to it! Do not cling to it! This dull white light is the inviting path created by your own habitual tendencies for deep delusion, which you yourself have generated. If you become attached to it, you will roam within the god realms and be drawn into the cycles of existence of the six classes of beings."
      }
    ]
  },

  asura: {
    name: "Asura Realm",
    subtitle: "The Antigod Realm",
    modern: "competition, envy, outrage, ranking, status warfare",
    poison: "Envy",
    sage: "Vemacitra, green, bearing armour and a weapon",
    light: "A dull red light",
    color: "#b9433b",
    bookTitle: "Day Five of the Intermediate State",
    page: "p. 242",
    passages: [
      {
        page: "p. 279",
        text: "A dull red light indicative of the realm of the antigods will arise."
      },
      {
        page: "p. 100",
        text: "Within a radiant and vibrant maṇḍala, that is a lustrous green seminal point, stands Vemacitra, sage of the antigods, green in colour, bearing armour and a weapon. May he obstruct envy, which is the entrance to rebirth in the antigod realms!"
      },
      {
        page: "p. 242",
        text: "Together with the light of pristine cognition, a dull red light, indicative of the realm of the antigods and formed by envy, will also dawn before you. Cultivate an equanimity toward this dull light which is free from attachment or aversion! Even if your mental capacity is diminished, at least do not delight in it. At this time, under the sway of deep envy, you will [wish to] turn away in terror from the bright and dazzling green luminosity and you will come to feel delight and attachment towards the dull red light of the antigods."
      }
    ]
  },

  human: {
    name: "Human Realm",
    subtitle: "The Realm of Attachment",
    modern: "self-optimization, productivity, planning, dating, striving, anxious aspiration",
    poison: "Attachment",
    sage: "Sākyamuni, yellow, carrying a mendicant's staff",
    light: "A dull blue light",
    color: "#4a7c4f",
    bookTitle: "Day Three of the Intermediate State",
    page: "p. 238",
    passages: [
      {
        page: "p. 279",
        text: "A dull blue light indicative of the human realm will arise."
      },
      {
        page: "p. 100",
        text: "Within a radiant and vibrant maṇḍala, that is a lustrous yellow seminal point, stands Sākyamuni, sage of human beings, yellow in colour, and carrying a mendicant's staff. May he obstruct attachment, which is the entrance to rebirth in the human realms!"
      },
      {
        page: "p. 238",
        text: "Together with the light of pristine cognition, a dull blue light, indicative of the human realm, will also dawn before you and touch your heart. At that time, under the sway of pride, you will [wish to] turn away in fear and terror from the bright yellow light and you will come to delight in the dull blue light of the human realm and feel attachment towards it."
      }
    ]
  },

  animal: {
    name: "Animal Realm",
    subtitle: "The Realm of Delusion",
    modern: "autopilot, passive comfort, binge-watching, fast food, sleeping in, numb scrolling",
    poison: "Delusion",
    sage: "Sthirasiṃha, blue, carrying a book",
    light: "A dull green light",
    color: "#8b7330",
    bookTitle: "The Path of the Deluded Animal-Realms",
    page: "p. 101",
    passages: [
      {
        page: "p. 279",
        text: "A dull green light indicative of the animal realm will arise."
      },
      {
        page: "p. 100",
        text: "Amidst an expanse of light in the energy centre of one's navel, within a radiant and vibrant maṇḍala, that is a lustrous blue seminal point, stands Sthirasiṃha, sage of animals, blue in colour, and carrying a book. May he obstruct delusion, which is the entrance to rebirth in the animal realms!"
      },
      {
        page: "p. 125",
        text: "I bow down to Sthirasiṃha, [sage] whose emanational buddha form acts [ceaselessly] on behalf of beings, the natural purity of delusion, and guide of the animal realms, blue, and holding a book."
      },
      {
        page: "p. 101",
        text: "Simultaneously, the [light] path of the animal realms, indicative of delusion, will [also] dawn before us. O divine assembly of awareness holders, at that moment, do not withhold your compassion, but draw us back from the dull-light path, which is the gateway to the deluded animal-realms."
      }
    ]
  },

  ghost: {
    name: "Hungry Ghost Realm",
    subtitle: "The Realm of Anguished Spirits",
    modern: "endless craving, shopping, validation hunger, likes/followers, compulsive desire",
    poison: "Miserliness / Craving",
    sage: "Jvālamukha, red, carrying a wish-granting casket",
    light: "A dull yellow light",
    color: "#6b3a8f",
    bookTitle: "Day Four of the Intermediate State",
    page: "p. 240",
    passages: [
      {
        page: "p. 279",
        text: "A dull yellow light indicative of the realm of the anguished spirits will arise."
      },
      {
        page: "p. 100",
        text: "Within a radiant and vibrant maṇḍala, that is a lustrous red seminal point, stands Jvālamukha, sage of the anguished spirits, red in colour, carrying a wish-granting casket. May he obstruct miserliness, which is the entrance to rebirth among the anguished-spirit realms!"
      },
      {
        page: "p. 240",
        text: "Together with the light of pristine cognition, a dull yellow light, indicative of the realm of anguished spirits, will also dawn before you. Do not delight in the dull yellow light! Do not become attached to it and do not cling to it! At this time, under the sway of deep desire, you will [wish to] turn away in terror from the bright red light and you will come to delight in the dull yellow light of the anguished spirits and feel attachment towards it."
      }
    ]
  },

  hell: {
    name: "Hell Realm",
    subtitle: "The Realm of Aversion",
    modern: "burnout, panic, doomscrolling, financial stress, workplace torment, digital overload",
    poison: "Aversion / Hatred",
    sage: "Yama Dharmarāja, black, carrying a flame and water",
    light: "A dull smoky light",
    color: "#8a2a1d",
    bookTitle: "Day Two of the Intermediate State",
    page: "p. 237",
    passages: [
      {
        page: "p. 279",
        text: "A dull smoky light indicative of the realm of the hell-beings will arise."
      },
      {
        page: "p. 101",
        text: "Amidst an expanse of light in the energy centre at the soles of one's feet, within a radiant and vibrant maṇḍala, that is a lustrous black seminal point, stands Yama Dharmarāja, sage of the hell beings, black in colour, and carrying a flame and water. May he obstruct aversion, which is the entrance to rebirth among the hell realms!"
      },
      {
        page: "p. 237",
        text: "Together with this light of pristine cognition, a dull smoky light, indicative of the hell realms, will also dawn before you. At that time, under the sway of aversion, you will [wish to] turn away in fear and terror from the bright white light and come to perceive the dull smoky light of the hell realms with delight."
      },
      {
        page: "p. 237",
        text: "If you become attached to it, you will fall into the realms of hell, sinking into a swamp of unbearable suffering, from which there will be no [immediate] opportunity for escape. This dull light is an obstacle blocking the path to liberation. Do not look at it! Abandon your aversion!"
      }
    ]
  },

  // Three Poisons at center
  greed: {
    name: "Greed",
    subtitle: "Attachment / Desire",
    modern: "The hook at the centre of the cycle — the appetite that drives the shopping cart.",
    poison: "Rooster (traditional symbol)",
    sage: "Transformed by Sakyamuni and Jvālamukha",
    bookTitle: "The Root of the Six Impure States",
    page: "p. 279",
    passages: [
      {
        page: "p. 279",
        text: "If you are fearful of the pure radiances of pristine cognition and become attached to the impure lights of cyclic existence with its six classes of beings, you will assume a body amongst one of these six realms, and you will be debilitated; for there will be no [immediate] opportunity for escape from cyclic existence, this vast ocean of suffering."
      },
      {
        page: "p. 279",
        text: "Do not be attached to the bewildering lights of the six classes of beings. Do not cling to them!"
      }
    ]
  },

  aversion: {
    name: "Aversion",
    subtitle: "Hatred / Anger",
    modern: "The flaming face at the centre — rage, fear, and the recoil from what hurts.",
    poison: "Snake (traditional symbol)",
    sage: "Transformed by Yama Dharmarāja",
    bookTitle: "On Aversion as the Gate of Rebirth",
    page: "p. 237",
    passages: [
      {
        page: "p. 237",
        text: "This dull light is the inviting path of the negative obscurations created by your own deep aversion, which you yourself have generated. If you become attached to it, you will fall into the realms of hell."
      },
      {
        page: "p. 237",
        text: "Abandon your aversion! Do not be attached to it! Do not cling to it! Be devoted to the white light, radiant and dazzling!"
      }
    ]
  },

  delusion: {
    name: "Delusion",
    subtitle: "Ignorance",
    modern: "The headset at the centre — mistaking the projection for reality.",
    poison: "Pig (traditional symbol)",
    sage: "Transformed by Sthirasiṃha (the sage with the book)",
    bookTitle: "The Root of Cyclic Existence",
    page: "Introduction, p. 19",
    passages: [
      {
        page: "Introduction",
        text: "The principle of dependent origination asserts that nothing exists in its own right independent of other factors… Each cycle of the process begins with a misapprehension of the nature of actual reality. This fundamental ignorance acts as a condition for the arising of the propensities created by our past actions."
      },
      {
        page: "Glossary",
        text: "Cyclic existence emerges from fundamental ignorance (avidyā) through a process known as the twelve links of dependent origination. When fundamental ignorance, identified as the misapprehension of the nature of actual reality, is reversed, cyclic existence is itself reversed, and the contrasting state of nirvāṇa is attained."
      }
    ]
  },

  // Figures outside the wheel
  yama: {
    name: "Yama, Lord of Death",
    subtitle: "Who holds the wheel",
    modern: "The wrathful figure gripping the entire cycle — impermanence itself.",
    poison: "",
    sage: "Yama Dharmarāja also appears within the wheel as the black sage of the hell-beings.",
    bookTitle: "The Fearsome Passageway of the Intermediate State",
    page: "p. 101",
    passages: [
      {
        page: "p. 101",
        text: "As soon as we die and begin to transmigrate, at that very moment, when the visions of the intermediate state of rebirth dawn, and we roam [alone] in cyclic existence [driven] by deep-seated habitual tendencies, may the three sages of the higher realms draw us forward, leading us on the path of radiant light, which is the four pristine cognitions combined. May the three sages of the lower realms support us from behind, and thus [encircled] may we be rescued from the light paths of the six impure states [of existence], and be escorted to the level of an utterly perfected buddha."
      }
    ]
  },

  buddha: {
    name: "The Buddha",
    subtitle: "Pointing beyond the wheel",
    modern: "The one who already stepped out of the cycle, pointing the way.",
    poison: "",
    sage: "",
    bookTitle: "The Instruction to Recognise",
    page: "p. 279",
    passages: [
      {
        page: "p. 279",
        text: "Be devoted to the bright and dazzling radiances of pure pristine cognition. Be full of devotion and think: 'The light rays of pristine cognition, which are the compassion of Those Gone to Bliss, the transcendent lords of the five enlightened families, have come to seize me with compassion. I take refuge in them.'"
      },
      {
        page: "p. 279",
        text: "Meditate now on the light [that dawns] as being Mahākāruṇika! Meditate on the thought that when the light dawns, it is Mahākāruṇika. This is the most profound crucial point. It is extremely important, because [this oral instruction] obstructs birth."
      }
    ]
  },

  moon: {
    name: "The Moon",
    subtitle: "Liberation",
    modern: "The cool light above the cycle — reality's expanse, untouched by the wheel's turning.",
    poison: "",
    sage: "",
    bookTitle: "On the Irreversible Path",
    page: "p. 58",
    passages: [
      {
        page: "p. 58",
        text: "The ocean of mundane cyclic existence is like an illusion. All compounded things lack permanence. Their essence is empty and selfless, but these naive beings [right here] who do not realise this to be so roam through cyclic existence, [driven on] by the twelve links of dependent origination."
      }
    ]
  },

  outer: {
    name: "The Outer Ring",
    subtitle: "Twelve Links of Dependent Origination",
    modern: "Wake • Check phone • Commute • Work • Post • Lunch scroll • Shop • Repeat — the modern twelve links.",
    poison: "",
    sage: "",
    bookTitle: "Dependent Origination",
    page: "Introduction, pp. 19–20",
    passages: [
      {
        page: "pp. 19–20",
        text: "The process through which the external world and the sentient beings within it revolve in a cycle of existence propelled by karmic propensities and their interaction with misapprehension, attraction and aversion and conditions is described in terms of twelve interdependent links. Each cycle of the process begins with a misapprehension of the nature of actual reality. This fundamental ignorance acts as a condition for the arising of the propensities created by our past actions, mental, verbal and physical, which condition our dualising consciousness."
      },
      {
        page: "pp. 19–20",
        text: "Our dualising consciousness, in turn, conditions the qualities and mode of interaction of our psycho-physical aggregates, which condition our sensory fields, which generate contact, which generates sensations, and then in turn attachment, grasping, and maturation towards rebirth. At this point there is an interaction with the genetic constituents of the parents and subsequent interaction with the environment, and then finally we have birth, ageing and death."
      }
    ]
  },

  caption: {
    name: "See the cycle. Know its nature. Let go.",
    subtitle: "The closing instruction",
    modern: "The three moves of the whole book: recognise the realm you are in, see through it, release.",
    poison: "",
    sage: "",
    bookTitle: "Natural Liberation",
    page: "Chapter 4, p. 59",
    passages: [
      {
        page: "p. 100",
        text: "To you, the six sages, the Buddha-bodies of Emanation, who act for the benefit of living beings, I bow down, make offerings, take refuge, and pray… may we be rescued from the light paths of the six impure states of existence, and be escorted to the level of an utterly perfected buddha."
      },
      {
        page: "Dedication",
        text: "May all sentient beings, children of buddha nature, realise the ultimate nature of mind: insight and compassion, in blissful union."
      }
    ]
  }
};
