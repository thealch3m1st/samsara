// Curated glossary drawn from the Glossary of Key Terms and the main text of
// The Tibetan Book of the Dead (Penguin Classics Deluxe Edition, trans. Gyurme
// Dorje & Graham Coleman).
//
// Each entry:
//   short — a one-line essence
//   body  — fuller paragraph(s), mostly verbatim from the book
//   tib/skt — Tibetan and Sanskrit names, if given
//   see   — other glossary terms worth a click
//   page  — nearest page reference in the book

const GLOSSARY = {

  // -----------------------------------------------------------------
  // Root structure: the cycle itself
  // -----------------------------------------------------------------

  "Cyclic Existence": {
    short: "Saṃsāra — the wheel of life, death and rebirth driven by karma and dissonant states.",
    tib: "’khor-ba",
    skt: "saṃsāra",
    body:
      "A state of existence conditioned by dissonant mental states and the imprint of past actions (karma), characterised by suffering in a cycle of life, death and rebirth, in which the six classes of sentient beings (ṣaḍgati; Tib. ’gro-ba rigs-drug) rotate. Cyclic existence emerges from fundamental ignorance (avidyā) through a process known as the twelve links of dependent origination. When fundamental ignorance, identified as the misapprehension of the nature of actual reality (dharmatā), is reversed, cyclic existence is itself reversed, and the contrasting state of nirvāṇa is attained, free from suffering and the processes of rebirth.",
    see: ["Fundamental Ignorance", "Dependent Origination", "Karma", "Six Classes of Sentient Beings", "Suffering"],
    page: "Glossary",
  },

  "Fundamental Ignorance": {
    short: "The primal misapprehension of reality — the root of all other poisons and of the cycle itself.",
    tib: "ma-rig-pa",
    skt: "avidyā",
    body:
      "The most fundamental misapprehension of the nature of actual reality, which is the source of all dissonant mental states and the twelve links of dependent origination. Divergent views exist among Buddhist thinkers about the specific character and nature of fundamental ignorance. For example, the fourth-century master Asaṅga conceives this ignorance to be a state of unknowing, ignorant of the actual nature of reality. In contrast, for masters like Nāgārjuna and especially Dharmakīrti, it is an active state of mis-knowing, i.e. it understands the existence of one’s own self and the world in a fundamentally distorted manner.",
    see: ["Delusion", "Dependent Origination", "Cyclic Existence", "Pristine Cognition"],
    page: "Glossary",
  },

  "Dependent Origination": {
    short: "Nothing exists in its own right. All things and events arise only in dependence on other factors.",
    tib: "rten-’brel",
    skt: "pratītyasamutpāda",
    body:
      "The doctrine of dependent origination can be said to be the most fundamental metaphysical view of Buddhist thought. The principle asserts that nothing exists independently of other factors, the reason being that things and events come into existence only by dependence on the aggregation of multiple causes and conditions. Each cycle of the process begins with a misapprehension of the nature of actual reality. This fundamental ignorance acts as a condition for the arising of the propensities created by our past actions, which condition our dualising consciousness. That in turn conditions the psycho-physical aggregates, the sensory fields, contact, sensations, attachment, grasping, and maturation toward rebirth — then birth, ageing and death.",
    see: ["Fundamental Ignorance", "Karma", "Cyclic Existence"],
    page: "pp. 19–20",
  },

  "Karma": {
    short: "Past actions — the imprints of everything done by body, speech and mind that shape future experience.",
    tib: "las",
    skt: "karma",
    body:
      "In the Buddhist context, karma refers not to fate but to intentional actions of body, speech and mind, together with the subtle imprints they leave on the mental continuum. These imprints condition future experience and, crucially, the realm of one’s next rebirth. When the book says a dull light ‘of the realm into which you are to be born will shine the most of all,’ it is the weight of karmic tendencies that determines which dull light predominates.",
    see: ["Dependent Origination", "Cyclic Existence", "Intermediate State of Rebirth"],
    page: "p. 279",
  },

  "Suffering": {
    short: "Not only pain, but the unsatisfactory quality of all conditioned existence.",
    tib: "sdug-bsngal",
    skt: "duḥkhatā",
    body:
      "In a Buddhist context, the term ‘suffering’ is used in a broad sense and includes not only physical and mental pain, but also more subtle ‘sufferings of change’ and the underlying ‘suffering of conditioning’ — the fact that ordinary experience is permeated by instability and cannot, by itself, deliver lasting satisfaction. Recognition of this is the First of the Four Noble Truths.",
    see: ["Cyclic Existence", "Dissonant Mental States"],
    page: "Glossary",
  },

  "Dissonant Mental States": {
    short: "The afflictive emotions — attachment, aversion, delusion and the rest — that power the cycle.",
    tib: "nyon-mongs",
    skt: "kleśa",
    body:
      "Those mental states which afflict the mind and perpetuate its bondage to cyclic existence. Their basic enumeration is as the three poisons; more extensively as the five poisons: delusion, attachment, aversion, pride, and envy.",
    see: ["Three Poisons", "Five Poisons"],
    page: "Glossary",
  },

  // -----------------------------------------------------------------
  // The poisons
  // -----------------------------------------------------------------

  "Three Poisons": {
    short: "Attachment, aversion, delusion — the three inner forces that spin the wheel.",
    tib: "dug-gsum",
    body:
      "Attachment, aversion and delusion. The three most basic dissonant mental states, all grounded in fundamental ignorance.",
    see: ["Attachment", "Aversion", "Delusion", "Five Poisons", "Dissonant Mental States"],
    page: "Glossary",
  },

  "Five Poisons": {
    short: "The three poisons plus pride and envy — one for each of the six realms.",
    tib: "dug-lnga",
    skt: "pañcakleśa",
    body:
      "The five poisons comprise five of the most basic dissonant mental states — all of which are grounded in fundamental ignorance (avidyā). They are: delusion (moha), attachment (rāga), aversion (dveṣa), pride (abhimāna), and envy / self-cherishing ambition (īrṣā). Miserliness is sometimes added as a sixth, associated with the anguished-spirit realm.",
    see: ["Delusion", "Attachment", "Aversion", "Pride", "Envy", "Miserliness"],
    page: "Glossary",
  },

  "Attachment": {
    short: "Craving and clinging — the gate to the human realm.",
    tib: "chags-pa / ’dod-chags",
    skt: "rāga",
    body:
      "One of the three poisons. Attachment is the grasping that follows from pleasant sensations — desire for, and clinging to, objects, people, experiences and states of mind. In its characteristic manifestation it is said to generate rebirth in the human realm, where striving and anxious aspiration dominate.",
    see: ["Three Poisons", "Human Realm", "Sakyamuni"],
    page: "p. 238",
  },

  "Aversion": {
    short: "Hatred, anger, fear — the gate to the hell realms.",
    tib: "zhe-sdang",
    skt: "dveṣa",
    body:
      "One of the three poisons. In Buddhist literature, the terms aversion and hatred are often used interchangeably with anger. In its subtle manifestation aversion is said to obstruct an individual from a correct perception of forms. In its extreme manifestation, as overwhelming hatred and fear, it is said to be characteristic of the worlds of the hells (narakaloka).",
    see: ["Three Poisons", "Hell Realm", "Yama Dharmarāja"],
    page: "p. 237",
  },

  "Delusion": {
    short: "Ignorance in its everyday form — dullness, autopilot, missing what is actually happening.",
    tib: "gti-mug",
    skt: "moha",
    body:
      "One of the three poisons, along with aversion and attachment. Delusion is the obfuscating mental factor which obstructs an individual from generating knowledge or insight, and it is said to be characteristic of the animal world. Distinct from, but grounded in, fundamental ignorance — delusion is ignorance lived out moment-to-moment as distraction, torpor and autopilot.",
    see: ["Fundamental Ignorance", "Three Poisons", "Animal Realm", "Sthirasiṃha"],
    page: "Glossary",
  },

  "Pride": {
    short: "Self-inflation — the gate to the god realms.",
    tib: "nga-rgyal",
    skt: "māna",
    body:
      "One of the five poisons. Pride is the inflated self-assessment that comes with privilege, beauty, wealth, or talent. It is said to be characteristic of the worlds of the gods, whose long pleasant lives dull their motivation to seek liberation.",
    see: ["Five Poisons", "Deva Realm", "Sakra"],
    page: "p. 100",
  },

  "Envy": {
    short: "Rivalrous ambition — the gate to the antigod realms.",
    tib: "phrag-dog",
    skt: "īrṣā",
    body:
      "Envy, which includes all the various forms of self-cherishing ambition, is one of the five poisons of the mind, along with aversion, delusion, pride, and attachment. In its extreme manifestation, of persistent hostile competitiveness, it is said to characterise the worlds of the antigods (asuraloka).",
    see: ["Five Poisons", "Asura Realm", "Vemacitra"],
    page: "p. 242",
  },

  "Miserliness": {
    short: "Hoarding craving — the gate to the anguished-spirit realms.",
    tib: "ser-sna",
    skt: "mātsarya",
    body:
      "The grasping inability to share or release — grounded in a sense of insufficiency that no amount can satisfy. Miserliness is said to be the entrance to rebirth among the anguished-spirit realms. Its guide-sage Jvālamukha carries a wish-granting casket precisely because the medicine for this poison is generosity.",
    see: ["Hungry Ghost Realm", "Jvālamukha"],
    page: "p. 100",
  },

  // -----------------------------------------------------------------
  // The six realms (also indexed as wheel sections)
  // -----------------------------------------------------------------

  "Six Classes of Sentient Beings": {
    short: "Gods, antigods, humans, animals, anguished spirits, hell-beings — the six realms.",
    tib: "’gro-ba rigs-drug",
    skt: "ṣaḍgati",
    body:
      "The six classes of sentient beings in cyclic existence: gods (deva; lha), antigods (asura; lha ma-yin), humans (manuṣya; mi), animals (tiryak; byol-song), anguished spirits (preta; yi-dvags), and hell-beings (naraka; dmyal-ba). Each realm is presided over by a sage who is a form of the Buddha’s emanation, and is entered through a specific dissonant mental state.",
    see: ["Deva Realm", "Asura Realm", "Human Realm", "Animal Realm", "Hungry Ghost Realm", "Hell Realm", "Six Sages"],
    page: "Glossary",
  },

  "Deva Realm": {
    short: "The god realm. Entered through pride. Its dull light is white.",
    section: "deva",
    body:
      "The mode of being and activity of the gods (deva) is said to be dominated by a false sense of lasting security and the pleasures of abundance — beautiful form, long life, effortless ease. The very richness of the realm muffles the motivation to seek liberation. It is entered at death by those whose habitual tendencies incline them to pride.",
    see: ["Pride", "Sakra"],
    page: "p. 100",
  },

  "Asura Realm": {
    short: "The antigod realm. Entered through envy. Its dull light is red.",
    section: "asura",
    body:
      "The antigods (asura) are locked in hostile competitiveness, status warfare and persistent ambition. Their guide-sage Vemacitra bears armour and a weapon — an image of the realm’s defining energy. The entrance to this realm is envy.",
    see: ["Envy", "Vemacitra"],
    page: "p. 242",
  },

  "Human Realm": {
    short: "The human realm. Entered through attachment. Its dull light is blue.",
    section: "human",
    body:
      "The human realm is considered the most fortunate of the six for practice, because it balances suffering with enough freedom to recognise suffering’s causes. Its defining poison, however, is attachment — craving, striving, and anxious aspiration. The sage of humans, Śākyamuni, carries a mendicant’s staff: the symbol of one who has renounced grasping.",
    see: ["Attachment", "Sakyamuni"],
    page: "p. 238",
  },

  "Animal Realm": {
    short: "The animal realm. Entered through delusion. Its dull light is green.",
    section: "animal",
    body:
      "The animal realm is characterised by delusion — an obscured awareness that cannot see causes and consequences clearly. Its sage Sthirasiṃha carries a book, because the antidote to delusion is the steady, slow cultivation of insight.",
    see: ["Delusion", "Sthirasiṃha"],
    page: "p. 100",
  },

  "Hungry Ghost Realm": {
    short: "The realm of anguished spirits. Entered through miserliness. Its dull light is yellow.",
    section: "ghost",
    body:
      "The anguished spirits (preta, yi-dvags) are classically depicted with huge stomachs and tiny throats — the image of craving that cannot be satisfied. Their guide-sage Jvālamukha carries a wish-granting casket, the antidote of generosity. Entrance is through miserliness and unsatisfied craving.",
    see: ["Miserliness", "Jvālamukha"],
    page: "p. 240",
  },

  "Hell Realm": {
    short: "The hell realms. Entered through aversion. Its dull light is smoky.",
    section: "hell",
    body:
      "Hell (naraka) is the realm most saturated with suffering — worlds generated by aversion, hatred and fear. Yama Dharmarāja, the sage of the hells, carries a flame and water: the two antidotes for wrath. Entrance is through aversion.",
    see: ["Aversion", "Yama Dharmarāja"],
    page: "p. 237",
  },

  // -----------------------------------------------------------------
  // The six sages (and the Buddha, Mahākāruṇika)
  // -----------------------------------------------------------------

  "Six Sages": {
    short: "Six emanations of the Buddha, one guiding each realm out of its defining poison.",
    tib: "sprul-sku thub-drug",
    body:
      "The six sages are aspects of the Buddha-body of Emanation (nirmāṇakāya) which manifest in the realms of the six classes of living beings, namely: Indraśakra, the sage of the gods (white, with a lute); Vemacitra, the sage of the antigods (green, with armour and weapon); Śākyasiṃha / Śākyamuni, the sage of humans (yellow, with a mendicant’s staff); Sthirasiṃha, the sage of animals (blue, with a book); Jvālamukha, the sage of the anguished spirits (red, with a wish-granting casket); and Yama Dharmarāja, the sage of the hells (black, with flame and water).",
    see: ["Sakra", "Vemacitra", "Sakyamuni", "Sthirasiṃha", "Jvālamukha", "Yama Dharmarāja"],
    page: "Glossary",
  },

  "Sakra": {
    short: "White sage of the god-realms, holding a lute. Transforms pride.",
    tib: "brgya-byin (Indraśakra)",
    body:
      "Sakra, sage of the god realms, white in colour, playing a lute. ‘Amidst an expanse of light in the channel branch of the energy centre of great bliss at one’s crown… may he obstruct pride, which is the entrance to rebirth in the god realms!’",
    see: ["Deva Realm", "Pride", "Six Sages"],
    page: "p. 100",
  },

  "Vemacitra": {
    short: "Green sage of the antigods, bearing armour and a weapon. Transforms envy.",
    body:
      "Vemacitra, sage of the antigods, green in colour, bearing armour and a weapon. ‘May he obstruct envy, which is the entrance to rebirth in the antigod realms!’",
    see: ["Asura Realm", "Envy", "Six Sages"],
    page: "p. 100",
  },

  "Sakyamuni": {
    short: "Yellow sage of humans, carrying a mendicant’s staff. Transforms attachment.",
    tib: "shākya",
    skt: "Śākyamuni / Śākyasiṃha",
    body:
      "Śākyamuni, sage of human beings, yellow in colour, carrying a mendicant’s staff. ‘May he obstruct attachment, which is the entrance to rebirth in the human realms!’ The historical Buddha himself appears here as the emanational sage of our own realm.",
    see: ["Human Realm", "Attachment", "Six Sages"],
    page: "p. 100",
  },

  "Sthirasiṃha": {
    short: "Blue sage of animals, holding a book. Transforms delusion.",
    body:
      "Sthirasiṃha, sage of animals, blue in colour, carrying a book. ‘May he obstruct delusion, which is the entrance to rebirth in the animal realms!’",
    see: ["Animal Realm", "Delusion", "Six Sages"],
    page: "p. 100",
  },

  "Jvālamukha": {
    short: "Red sage of the anguished spirits, carrying a wish-granting casket. Transforms miserliness.",
    body:
      "Jvālamukha, sage of the anguished spirits, red in colour, carrying a [wish-granting] casket. ‘May he obstruct miserliness, which is the entrance to rebirth among the anguished-spirit realms!’",
    see: ["Hungry Ghost Realm", "Miserliness", "Six Sages"],
    page: "p. 100",
  },

  "Yama Dharmarāja": {
    short: "Lord of Death. Black sage of the hells, carrying flame and water. Holds the wheel in his jaws.",
    tib: "gshin-rje chos-kyi rgyal-po",
    body:
      "The embodiment of the forces of impermanence and the infallible laws of cause and effect. His fierce form is iconographically depicted holding the wheel of life’s rebirth processes (bhavacakra, Tib. srid-pa’i ’khor-lo) within his jaws, indicating that the nature of cyclic existence is in its entirety bound by impermanence and the laws of cause and effect.",
    see: ["Hell Realm", "Aversion", "Cyclic Existence", "Karma", "Six Sages"],
    page: "Glossary",
  },

  "Mahākāruṇika": {
    short: "‘The Great Compassionate One’ — the form of compassion that appears as the saving light at death.",
    skt: "mahākāruṇika",
    body:
      "An epithet of Avalokiteśvara, the embodiment of great compassion. At the crucial point of the intermediate state of rebirth, the instruction is: ‘Meditate now on the light that dawns as being Mahākāruṇika! Meditate on the thought that when the light dawns, it is Mahākāruṇika. This is the most profound crucial point. It is extremely important, because this oral instruction obstructs birth.’",
    see: ["Compassion", "Intermediate State of Rebirth"],
    page: "p. 279",
  },

  "Compassion": {
    short: "Great compassion — the spontaneous wish for all beings to be free of suffering.",
    tib: "snying-rje / thugs-rje",
    skt: "karunā",
    body:
      "The term ‘compassion’ is often used as a synonym for ‘great compassion’ (mahākarunā), which refers to a totally unbiased mind that aspires to the liberation of all sentient beings from suffering, equally. Compassion is said to become ‘great’ only when, through proper training of the mind, such an altruistic aspiration becomes spontaneous and no longer requires any conscious effort for its arising.",
    see: ["Mahākāruṇika"],
    page: "Glossary",
  },

  // -----------------------------------------------------------------
  // Between-state and practice
  // -----------------------------------------------------------------

  "Intermediate State of Rebirth": {
    short: "The bardo after death, when consciousness, driven by karma, seeks its next body.",
    tib: "srid-pa’i bar-do",
    body:
      "The intermediate state of rebirth is entered after the intermediate state of reality, when the consciousness arises in the form of a mental body, conditioned by the individual’s inheritance of past actions. The individual begins to experience both the surroundings where he or she died and the unfolding of experiential states driven by the momentum of past actions. The six dull lights indicative of the six realms dawn here.",
    see: ["Karma", "Six Classes of Sentient Beings", "Pristine Cognition", "Mahākāruṇika"],
    page: "p. 279",
  },

  "Pristine Cognition": {
    short: "The radiant, unbewildered awareness that is mind’s own nature.",
    tib: "ye-shes",
    skt: "jñāna",
    body:
      "Pristine cognition is the natural luminosity of awareness itself — the mind free of subject-object dichotomy and fundamental ignorance. At the crucial points of the intermediate state, it is said to dawn as brilliant, piercing radiances of five colours, paired with dull lights of the six realms. The instruction is not to turn away in fear from the bright light to the soft dull light of habit.",
    see: ["Fundamental Ignorance", "Intermediate State of Rebirth", "Mahākāruṇika"],
    page: "p. 235",
  },

  "Meditational Deity": {
    short: "A visualised form of fully manifest buddhahood — a focus for transformation.",
    tib: "yi-dam",
    skt: "iṣṭadevatā",
    body:
      "Forms or resonances of fully manifest buddhahood whose characteristics are defined or revealed by specific tantric practices. After receiving empowerment and guidance concerning an appropriate meditational deity from an authoritative spiritual teacher, the practitioner seeks to experientially cultivate union with the qualities of buddha-body, speech and mind through the practice of the generation stage.",
    see: ["Pristine Cognition"],
    page: "Glossary",
  },

  "Maṇḍala": {
    short: "A circle, wheel, totality — and the deity-arrangement visualised in tantric practice.",
    tib: "dkyil-’khor",
    body:
      "The Sanskrit word ‘maṇḍala’ conveys a number of meanings — circle, wheel, circumference, totality, assembly. In general usage, this term indicates the central (dkyil) and peripheral (’khor) deities described in the tantra texts. The Wheel of Saṃsāra itself is one such maṇḍala: a totality within which every position is mapped.",
    see: ["Meditational Deity"],
    page: "Glossary",
  },

  "Vajrasattva": {
    short: "‘The spiritual hero of indestructible reality.’ The white buddha of purification.",
    tib: "rdo-rje sems-dpa’",
    body:
      "Vajrasattva, in literal translation ‘the spiritual hero of indestructible reality,’ is the central buddha of purification practices. In the intermediate state he appears on the second day as the one who escorts the deceased on the dangerous pathway — paired with the dull smoky light of the hells, which the deceased is urged not to follow.",
    see: ["Pristine Cognition", "Intermediate State of Rebirth", "Aversion"],
    page: "p. 237",
  },

};
