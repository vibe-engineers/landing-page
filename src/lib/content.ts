import {
  Wrench,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Gamepad2,
  Rocket,
  BrainCircuit,
  Dices,
} from 'lucide-react'

export const siteConfig = {
  url: 'https://vibe-engineers.dev',
  ogImage: 'https://vibe-engineers.dev/images/landscape_thumbnail.jpg',
  links: {
    github: 'https://github.com/vibe-engineers',
    discord: 'https://discord.gg/dBW35GBCPZ',
    twitter: '#',
    email: 'mailto:vibe.engineers.team@gmail.com',
  },
}

export const navLinks = [
  { href: '#tools', key: 'tools' },
  { href: '#philosophy', key: 'philosophy' },
  { href: '#examples', key: 'examples' },
  { href: '#faq', key: 'faq' },
]

export const heroContent = {
  primaryCta: {
    href: '#tools',
  },
  secondaryCta: {
    href: siteConfig.links.discord,
  },
}

export const tools = [
  {
    name: 'vibetools',
    icon: Wrench,
    learnMoreHref: '#examples',
  },
  {
    name: 'vibechecks',
    icon: ShieldCheck,
    learnMoreHref: '#examples',
  },
  {
    name: 'viberetry',
    icon: RefreshCw,
    learnMoreHref: '#examples',
  },
  {
    name: 'vibegen',
    icon: Sparkles,
    learnMoreHref: '#examples',
  },
]

export const philosophyContent = {
  principles: [
    {
      icon: Gamepad2,
      key: 'playful',
    },
    {
      icon: Dices,
      key: 'nonDeterminism',
    },
    {
      icon: Rocket,
      key: 'boundaryPushing',
    },
    {
      icon: BrainCircuit,
      key: 'contextAwareness',
    },
  ],
}

export const codeExamples = {
  vibechecks: {
    label: 'vibechecks',
    code: `from google import genai
from vibechecks import VibeCheck

# initialize client
client = genai.Client(api_key=GEMINI_API_KEY)

# wrap it in VibeCheck
vc = VibeCheck(client, model="gemini-2.0-flash-lite")

# the example below asks user for a dog breed and checks if it is valid
user_input = input("Enter a dog breed:")
if vc(f"{user_input} is a valid dog breed"):
    print(f"{user_input} is a valid dog breed!")
else:
    print(f"{user_input} is not a valid dog breed!")`,
  },
  viberetry: {
    label: 'viberetry',
    code: `// AI-influenced jitter/backoff can vary.
await viberetry.call(fetchWithBackoff, {
  maxAttempts: 5,
  strategy: "adaptive",
  // highlight-next-line
  guardrail: { timeoutMs: 8000 },
});`,
  },
  vibegen: {
    label: 'vibegen',
    code: `from google import genai
from vibegen import VibeGen

# initialize client
client = genai.Client(api_key=GEMINI_API_KEY)

# wrap it in VibeGen
vg = VibeGen(client, model="gemini-2.0-flash-lite")

@vg
def get_antonym(word: str) -> str:
    """
    This function takes a word and returns its antonym.
    For example, the antonym of 'hot' is 'cold'.
    """
    pass

# a simple example that gets the antonym of a word
user_input = input("Enter a word:")
antonym = get_antonym(user_input)
print(f"The antonym of {user_input} is {antonym}")`,
  },
}

export const faqContent = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']
