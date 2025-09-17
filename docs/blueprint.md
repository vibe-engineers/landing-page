# **App Name**: Vibe Engineers Landing Page

## Core Features:

- Informative Header: Provides links to different sections of the page: Tools, Philosophy, Examples, FAQ, and GitHub. Includes a theme toggle button for switching between light and dark modes.
- Dynamic Hero Section: Displays a bold tagline, a concise subcopy explaining the core concept of vibe engineering, and clear calls to action: Explore the tools and View examples.
- Interactive Tools Grid: Showcases the key vibe tools—vibetools, vibechecks, viberetry, and vibegen—in an engaging grid format. Each tool is represented by an icon, a one-line value proposition, a few descriptive bullets, and a direct link for learning more.
- AI-Integrated Logic Explanation: Details how the AI-assisted logic functions, emphasizing the exploration and adaptation enabled by incorporating vibes into loops, conditions, and retries. Provides guardrails via tool calls.
- Tabbed Code Examples: Offers TypeScript code examples for each tool, complete with syntax highlighting, copy-to-clipboard functionality, and annotations pointing out the importance of non-determinism and required safe-guards.
- FAQ Section: Addresses frequently asked questions regarding determinism vs. vibes, safety/limits, testing strategies, and licensing.
- Persistent Theme Toggle: Allows users to switch between light and dark themes. The chosen theme is stored in localStorage to persist across sessions, and respects the user's `prefers-color-scheme` setting.

## Style Guidelines:

- Primary color: Indigo (#4B0082) for a bold and modern feel.
- Background color: Light gray (#F5F5F5) to provide a clean, unobtrusive backdrop.
- Accent color: Purple (#800080) to highlight interactive elements and calls to action, creating contrast and visual interest.
- Body and headline font: 'Inter' sans-serif, for a machined, objective, neutral appearance that works well in either headlines or body text.
- Utilize clear and modern Material UI icons to visually represent different sections and functionalities.
- Use a clean, high-contrast layout with sufficient whitespace for readability and a modern aesthetic.
- Implement subtle hover animations and transitions to enhance user engagement without overwhelming the user. Respects `prefers-reduced-motion` setting.