import { NextRequest, NextResponse } from 'next/server';

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
  "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum"
];

const randomWords = [
  "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "hello", "world",
  "amazing", "beautiful", "creative", "dynamic", "elegant", "fantastic", "gorgeous", "happy",
  "incredible", "joyful", "kind", "lovely", "magnificent", "nice", "outstanding", "perfect",
  "quiet", "radiant", "stunning", "terrific", "unique", "vibrant", "wonderful", "excellent",
  "brilliant", "awesome", "fantastic", "marvelous", "superb", "splendid", "remarkable", "extraordinary"
];

const businessWords = [
  "synergy", "leverage", "optimize", "streamline", "innovative", "strategic", "scalable", "robust",
  "enterprise", "solution", "ecosystem", "paradigm", "methodology", "framework", "infrastructure",
  "analytics", "metrics", "performance", "efficiency", "productivity", "collaboration", "integration",
  "transformation", "automation", "intelligence", "insights", "growth", "revenue", "market", "customer"
];

const techWords = [
  "algorithm", "database", "framework", "API", "cloud", "server", "client", "backend", "frontend",
  "deployment", "repository", "branch", "commit", "merge", "function", "variable", "array", "object",
  "component", "module", "library", "package", "dependency", "configuration", "environment", "testing",
  "debugging", "optimization", "performance", "security", "authentication", "authorization", "encryption"
];

const pirateWords = [
  "ahoy", "matey", "treasure", "parrot", "ship", "crew", "captain", "sail", "anchor", "compass",
  "plank", "cutlass", "doubloon", "barrel", "rum", "island", "map", "skull", "crossbones", "hook",
  "eyepatch", "beard", "scurvy", "landlubber", "scallywag", "buccaneer", "privateer", "jolly", "roger"
];

const zombieWords = [
  "brains", "undead", "zombie", "apocalypse", "horde", "infected", "survivor", "bite", "decay", "shamble",
  "groan", "flesh", "outbreak", "virus", "mutation", "corpse", "reanimated", "hunger", "instinct", "feeding",
  "plague", "contagion", "wasteland", "barricade", "fortress", "scavenge", "nightmare", "terror", "horror"
];

const spaceWords = [
  "galaxy", "nebula", "starship", "asteroid", "planet", "orbit", "cosmic", "universe", "spacecraft", "alien",
  "meteor", "comet", "blackhole", "supernova", "constellation", "satellite", "rocket", "mission", "exploration",
  "astronaut", "lunar", "solar", "interstellar", "wormhole", "antimatter", "quantum", "telepathic", "cybernetic"
];

const medievalWords = [
  "knight", "castle", "dragon", "sword", "shield", "armor", "quest", "kingdom", "throne", "crown",
  "wizard", "magic", "spell", "potion", "dungeon", "tower", "peasant", "noble", "royal", "siege",
  "battle", "warrior", "archer", "blacksmith", "tavern", "merchant", "guild", "monastery", "cathedral"
];

const nonsenseWords = [
  "flibber", "wobble", "zizzle", "flomp", "bingle", "snorfle", "grumpkin", "wibble", "floof", "sproink",
  "quizzle", "blorple", "frimble", "glonk", "snizzle", "flurble", "plonker", "grizzle", "fizzgig", "whomple",
  "snurffle", "boffin", "flummox", "gribble", "snoogle", "flibble", "grompf", "snizzard", "flonker", "bizzle"
];

const generateLoremIpsum = (wordCount: number) => {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(loremWords[i % loremWords.length]);
  }
  return words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ".";
};

const generateRandomWords = (wordCount: number, wordList: string[]) => {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  return words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ".";
};

const generateSentences = (sentenceCount: number) => {
  const sentences = [];
  const templates = [
    "The [adj] [noun] [verb] [adv].",
    "A [adj] [noun] can [verb] [obj].",
    "When you [verb] a [noun], it becomes [adj].",
    "The [noun] will [verb] the [obj] [adv].",
    "Every [adj] [noun] should [verb] [obj].",
    "Without [noun], the [adj] [obj] cannot [verb]."
  ];
  
  const adjectives = ["amazing", "beautiful", "creative", "dynamic", "elegant", "fantastic", "incredible", "magnificent"];
  const nouns = ["system", "solution", "product", "service", "platform", "application", "interface", "experience"];
  const verbs = ["creates", "builds", "develops", "manages", "optimizes", "transforms", "enhances", "delivers"];
  const adverbs = ["efficiently", "quickly", "seamlessly", "perfectly", "automatically", "intelligently", "reliably"];
  const objects = ["results", "outcomes", "experiences", "solutions", "innovations", "opportunities", "benefits"];

  for (let i = 0; i < sentenceCount; i++) {
    let sentence = templates[Math.floor(Math.random() * templates.length)];
    sentence = sentence.replace("[adj]", adjectives[Math.floor(Math.random() * adjectives.length)]);
    sentence = sentence.replace("[noun]", nouns[Math.floor(Math.random() * nouns.length)]);
    sentence = sentence.replace("[verb]", verbs[Math.floor(Math.random() * verbs.length)]);
    sentence = sentence.replace("[adv]", adverbs[Math.floor(Math.random() * adverbs.length)]);
    sentence = sentence.replace("[obj]", objects[Math.floor(Math.random() * objects.length)]);
    sentences.push(sentence);
  }
  
  return sentences.join(" ");
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const type = searchParams.get('type') || 'lorem';
  const length = Math.min(Math.max(parseInt(searchParams.get('length') || '50'), 1), 10000); // Allow up to 10,000 words
  const text = searchParams.get('text') || 'Hello World';
  const count = Math.min(Math.max(parseInt(searchParams.get('length') || '5'), 1), 1000); // Allow up to 1,000 repetitions
  
  let result = "";
  
  try {
    switch (type) {
      case "lorem":
        result = generateLoremIpsum(length);
        break;
      case "random":
        result = generateRandomWords(length, randomWords);
        break;
      case "business":
        result = generateRandomWords(length, businessWords);
        break;
      case "tech":
        result = generateRandomWords(length, techWords);
        break;
      case "pirate":
        result = generateRandomWords(length, pirateWords);
        break;
      case "zombie":
        result = generateRandomWords(length, zombieWords);
        break;
      case "space":
        result = generateRandomWords(length, spaceWords);
        break;
      case "medieval":
        result = generateRandomWords(length, medievalWords);
        break;
      case "nonsense":
        result = generateRandomWords(length, nonsenseWords);
        break;
      case "repeat":
        result = Array(count).fill(text).join(" ");
        break;
      case "sentences":
        result = generateSentences(length);
        break;
      default:
        result = generateLoremIpsum(length);
    }

    // Set CORS headers
    const response = new NextResponse(result, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate text' },
      { status: 500 }
    );
  }
} 