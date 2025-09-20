import {
  Wrench,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Gamepad2,
  Rocket,
  BrainCircuit,
  Dices,
  FileCode,
  HelpCircle,
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
  { href: '#tools', key: 'tools', icon: Wrench },
  { href: '#philosophy', key: 'philosophy', icon: BrainCircuit },
  { href: '#examples', key: 'examples', icon: FileCode },
  { href: '#faq', key: 'faq', icon: HelpCircle },
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
    name: 'vibechecks',
    lightImageSrc: '/images/light-theme-vibechecks.webp',
    darkImageSrc: '/images/dark-theme-vibechecks.webp',
    learnMoreHref: 'https://pypi.org/project/vibechecks/',
  },
  {
    name: 'vibegen',
    lightImageSrc: '/images/light-theme-vibegen.webp',
    darkImageSrc: '/images/dark-theme-vibegen.webp',
    learnMoreHref: 'https://pypi.org/project/vibegen/',
  },
  {
    name: 'viberetry',
    lightImageSrc: '/images/light-theme-viberetry.webp',
    darkImageSrc: '/images/dark-theme-viberetry.webp',
    learnMoreHref: 'https://pypi.org/project/viberetry/',
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
      key: 'adaptiveByDesign',
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
  viberetry: {
    label: 'viberetry',
    code: `from google import genai
from viberetry import VibeRetry

# initialize client
client = genai.Client(api_key=GEMINI_API_KEY)

# wrap it in VibeRetry
viberetry = VibeRetry(client, model="gemini-2.0-flash-lite")

# the example below simulates a function that always raises an exception
# to demonstrate the retry mechanism
@viberetry(max_retries=3, remarks="use exponential backoff")
def simulate_failure() -> int:
    """
    This function raises a simulated exception to demonstrate the retry mechanism.
    """
    raise Exception("Simulated exception.")

# this will fail, but the LLM will retry it a few times
# before finally raising the exception
simulate_failure()`,
  },
}

export const faqContent = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']
