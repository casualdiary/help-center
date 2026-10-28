// Help Center content. Facts come from public designs.ai pages and hands-on testing of dev.designs.ai.
// Articles flagged draft:true contain generic placeholder copy that needs product/legal review.
window.HELP_CATEGORIES = [
  { slug: 'getting-started', name: 'Getting started', icon: 'spark', desc: 'What Designs.ai does, Agent vs Ask, and your first brief.' },
  { slug: 'account', name: 'Account & sign-in', icon: 'user', desc: 'Signing in with Google or an email code, and team accounts.' },
  { slug: 'credits', name: 'Credits & billing', icon: 'coin', desc: 'How credits are spent on generations and where to check your balance.' },
  { slug: 'studio', name: 'Studio & Boards', icon: 'board', desc: 'Create, open and archive Boards, and work with generation nodes.' },
  { slug: 'agents', name: 'AI Agents', icon: 'agents', desc: 'Guides for the Branding, Image, Storyboard, Video, Slides and Audio agents.', isAgents: true },
  { slug: 'troubleshooting', name: 'Troubleshooting', icon: 'wrench', desc: 'Fixes for errors and messages you might see in Studio and Agents.' }
];

window.ARTICLES = [
  // ---------------- Getting started
  { id: 'what-is-designs-ai', cat: 'getting-started', title: 'What is Designs.ai?', popular: true, updated: '2026-10-21',
    summary: 'Your AI creative team, on demand: specialist agents that turn one brief into images, video, copy, design, audio and slides.',
    body: [
      { t: 'p', v: 'Designs.ai is your AI creative team, on demand. You brief Designs.ai once, and specialist agents handle the planning, pick the right models and deliver on-brand images, video, copy, design, audio and slides, ready to ship.' },
      { t: 'img', src: 'assets/agents/branding-agent/_category-hero.jpg', cap: 'One brief can become a full brand system, campaign visuals, video and audio.' },
      { t: 'h', v: 'The two places you will work' },
      { t: 'list', v: [
        '<b>AI Agents</b>: describe what you need in the prompt box. Pick an agent category (Branding, Image, Storyboard, Video, Slides or Audio) or start from an example.',
        '<b>Studio</b>: build and save media workflows on <a href="#/article/what-are-boards">Boards</a>, using nodes such as Generate image and Generate audio.'
      ]},
      { t: 'h', v: 'Where to go next' },
      { t: 'list', v: [
        '<a href="#/article/agent-vs-ask">Agent vs Ask: choosing a mode</a>',
        '<a href="#/article/first-brief">Write your first brief with an AI agent</a>',
        '<a href="#/article/how-credits-work">How credits work</a>'
      ]}
    ]},
  { id: 'agent-vs-ask', cat: 'getting-started', title: 'Agent vs Ask: choosing a mode', popular: true, updated: '2026-10-21',
    summary: 'The AI Agents page has two modes. Agent produces assets; Ask is for questions and ideas.',
    body: [
      { t: 'p', v: 'At the top of the prompt box on the AI Agents page you can switch between <b>Agent</b> and <b>Ask</b>.' },
      { t: 'ui', v: 'modes' },
      { t: 'h', v: 'Agent' },
      { t: 'p', v: 'Use Agent when you want something made. You choose a category (Branding, Image, Storyboard, Video, Slides or Audio), and the example cards under the prompt box show what that agent can do. Clicking an example card fills the prompt box with a ready-made prompt you can edit before you send it.' },
      { t: 'h', v: 'Ask' },
      { t: 'p', v: 'Use Ask when you want to talk an idea through, such as getting feedback, brainstorming directions or asking how to approach a brief, before you spend credits on generating.' },
      { t: 'callout', k: 'tip', v: 'Not sure which one you need? Start in Ask to shape the brief, then switch to Agent to produce it.' }
    ]},
  { id: 'first-brief', cat: 'getting-started', title: 'Write your first brief with an AI agent', popular: true, updated: '2026-10-21',
    summary: 'Pick an agent, start from an example prompt, and edit it to fit your brand.',
    body: [
      { t: 'h', v: 'Steps' },
      { t: 'steps', v: [
        'Go to <b>AI Agents</b> and make sure <b>Agent</b> mode is selected (not Ask).',
        'Choose a category: Branding, Image, Storyboard, Video, Slides or Audio.',
        'Click an example card. Its prompt is copied into the prompt box.',
        'Edit the prompt: swap in your brand name, audience, tone and the deliverables you need.',
        'If the card has a <span class="badge badge-media">Needs photo</span> or <span class="badge badge-media">Needs video</span> badge, attach your file first.',
        'Check the credit cost, then send.'
      ]},
      { t: 'img', src: 'assets/agents/image-agent/_category-hero.jpg', cap: 'Example cards give you a strong starting prompt for each agent.' },
      { t: 'h', v: 'What makes a good brief' },
      { t: 'list', v: [
        '<b>Name it</b>: the brand, product or character (for example, “a specialty coffee brand called Brewhaus”).',
        '<b>Feel</b>: three or four adjectives (“warm, crafted, inviting, quietly premium”).',
        '<b>Deliverables</b>: list exactly what you want back (logo direction, palette, packaging, social assets).',
        '<b>Format</b>: aspect ratio, length or number of slides, where relevant.'
      ]},
      { t: 'callout', k: 'info', v: 'Browse every example prompt in the <a href="#/agents">AI Agents guide</a>. Each one has a copy button.' }
    ]},
  { id: 'example-prompts', cat: 'getting-started', title: 'Using example prompts from the agents page', updated: '2026-10-21',
    summary: 'How example cards work for each agent, including the cards that need an upload.',
    body: [
      { t: 'p', v: 'Each agent category has example cards under the prompt box. In Agent mode, clicking a card fills the prompt box with its prompt.' },
      { t: 'h', v: 'Cards with a media badge' },
      { t: 'p', v: 'Some examples edit or animate your own media. These cards show a badge such as <span class="badge badge-media">Needs photo</span>, <span class="badge badge-media">Needs video</span> or <span class="badge badge-media">Needs product photo</span>. Attach the file before you send, or the agent has nothing to work from.' },
      { t: 'h', v: 'Slides styles' },
      { t: 'p', v: 'Slides cards such as “Cinematic Pitch Deck” or “Policy / Impact Story” are <b>style presets</b>. Clicking one selects a style chip; it doesn’t write a prompt. Describe your deck’s content yourself.' },
      { t: 'callout', k: 'tip', v: 'See <a href="#/agents">all 66 examples</a> grouped by agent, with the required inputs for each.' }
    ]},

  // ---------------- Account
  { id: 'sign-in-google', cat: 'account', title: 'Sign in with Google', updated: '2026-10-21',
    summary: 'Use your Google account to sign in to Designs.ai.',
    body: [
      { t: 'steps', v: [
        'Open Designs.ai and choose <b>Sign in</b>.',
        'Select <b>Continue with Google</b>.',
        'Pick the Google account you want to use and approve the request.',
        'You’ll be returned to Designs.ai, signed in.'
      ]},
      { t: 'callout', k: 'info', v: 'If you usually sign in with an email code, use the same email address in Google to reach the same account.', draft: true }
    ]},
  { id: 'sign-in-email-code', cat: 'account', title: 'Sign in with an email code', popular: true, updated: '2026-10-21',
    summary: 'No password needed: we email you a one-time code.',
    body: [
      { t: 'steps', v: [
        'Choose <b>Sign in</b> and enter your email address.',
        'Check your inbox for an email from Designs.ai with a one-time code.',
        'Enter the code on the sign-in screen.',
        'You’re signed in. Your session stays active for a while, but you’ll need a new code if it expires.'
      ]},
      { t: 'callout', k: 'tip', v: 'Codes are single-use. If you request a new one, use the newest code.' },
      { t: 'p', v: 'Code didn’t arrive? See <a href="#/article/no-sign-in-code">Didn’t get your sign-in code?</a>' }
    ]},
  { id: 'no-sign-in-code', cat: 'account', title: 'Didn’t get your sign-in code?', draft: true, updated: '2026-10-21',
    summary: 'Checks to try when the email code doesn’t arrive.',
    body: [
      { t: 'list', v: [
        'Wait a minute, then check your spam, junk or promotions folders.',
        'Make sure the email address is spelt correctly.',
        'Request a new code and use only the latest one.',
        'If your organisation filters external email, ask your IT team to allow mail from Designs.ai.'
      ]},
      { t: 'p', v: 'Still stuck? <a href="#" data-contact>Contact support</a>.' }
    ]},
  { id: 'team-accounts', cat: 'account', title: 'Team accounts and Studio', updated: '2026-10-21',
    summary: 'Studio doesn’t support shared team accounts yet. Here’s what that means.',
    body: [
      { t: 'p', v: 'Studio currently works with individual accounts. If you’re signed in to a shared team account, some Studio actions, such as running a Generate audio node, show this message:' },
      { t: 'ui', v: 'toast-team' },
      { t: 'p', v: 'See <a href="#/article/ts-team-accounts">the troubleshooting article</a> for what you can do in the meantime.' }
    ]},

  // ---------------- Credits
  { id: 'how-credits-work', cat: 'credits', title: 'How credits work', popular: true, updated: '2026-10-21',
    summary: 'Generations use credits. The cost is shown before you run a generation.',
    body: [
      { t: 'p', v: 'Generating media (images, audio, video and more) uses credits from your account. Different generations cost different amounts.' },
      { t: 'h', v: 'See the cost before you run' },
      { t: 'p', v: 'In Studio, each generation node shows its credit cost on the run button. For example, a Generate image node showed <b>25 credits</b> in our testing.' },
      { t: 'ui', v: 'node-cost' },
      { t: 'callout', k: 'warn', v: 'Costs can vary by model, settings and output. Always check the number on the node before you run it.' },
      { t: 'h', v: 'Plans and top-ups' },
      { t: 'p', v: 'How many credits you get depends on your plan. See your plan page in account settings for your current allowance and options.', draft: true }
    ]},
  { id: 'check-balance', cat: 'credits', title: 'Check your credit balance', draft: true, updated: '2026-10-21',
    summary: 'Find how many credits you have left.',
    body: [
      { t: 'steps', v: [
        'Sign in to Designs.ai.',
        'Open your account menu.',
        'Go to your plan page to see your remaining credits.'
      ]},
      { t: 'callout', k: 'info', v: 'Placeholder: confirm the exact menu labels with the product team before publishing.' }
    ]},
  { id: 'what-uses-credits', cat: 'credits', title: 'What uses credits?', updated: '2026-10-21',
    summary: 'Running generations uses credits. Browsing and setting up does not.',
    body: [
      { t: 'p', v: 'You spend credits when you <b>run a generation</b>, for example by running a Generate image or Generate audio node in Studio, or by sending a brief to an agent.' },
      { t: 'p', v: 'Browsing examples, creating, opening or archiving Boards, and editing prompts don’t generate anything.' },
      { t: 'callout', k: 'tip', v: 'Write and review your prompt before you run it. An empty or vague prompt still uses credits if you run it.' }
    ]},
  { id: 'billing-questions', cat: 'credits', title: 'Billing questions', draft: true, updated: '2026-10-21',
    summary: 'Invoices, payment methods and plan changes.',
    body: [
      { t: 'p', v: 'For invoices, payment methods and plan changes, see your plan page in account settings.' },
      { t: 'p', v: 'For anything you can’t find there, <a href="#" data-contact>contact support</a> and include the email address on your account.' },
      { t: 'callout', k: 'info', v: 'Placeholder copy: pricing and refund policy are owned by the billing team and aren’t stated here.' }
    ]},

  // ---------------- Studio
  { id: 'what-are-boards', cat: 'studio', title: 'What are Boards?', popular: true, updated: '2026-10-21',
    summary: 'Boards are saved media workflows in Studio. Chain nodes together and come back to them anytime.',
    body: [
      { t: 'p', v: 'A <b>Board</b> is a canvas in Studio where you build a media workflow from nodes, such as <b>Generate image</b> and <b>Generate audio</b>. Boards are saved, so you can reopen a workflow, tweak it and run it again.' },
      { t: 'ui', v: 'board' },
      { t: 'h', v: 'What you can do with Boards' },
      { t: 'list', v: [
        '<a href="#/article/create-board">Create a board</a>',
        'Open a board from the Boards list',
        'Add nodes and resources to a board',
        '<a href="#/article/archive-board">Archive a board, and view archived boards</a>'
      ]}
    ]},
  { id: 'create-board', cat: 'studio', title: 'Create a board', updated: '2026-10-21',
    summary: 'Start a new media workflow in Studio.',
    body: [
      { t: 'steps', v: [
        'Go to <b>AI Agents → Studio</b>.',
        'In the Boards list, select <b>New board</b>.',
        'Give your board a name. It appears in the list as <span class="badge">Active</span>.',
        'Open the board and add your first node.'
      ]},
      { t: 'callout', k: 'tip', v: 'Name boards after the project or campaign, such as “Spring launch – hero visuals”, so they’re easy to find later.' }
    ]},
  { id: 'nodes', cat: 'studio', title: 'Work with nodes: Generate image and Generate audio', updated: '2026-10-21',
    summary: 'Add generation nodes to a board, write a prompt, check the cost and run.',
    body: [
      { t: 'steps', v: [
        'Open a board and use <b>Add node</b>.',
        'Pick <b>Generate image</b> or <b>Generate audio</b>.',
        'Write your prompt in the node.',
        'Check the credit cost on the run button.',
        'Run the node. The result appears on the board.'
      ]},
      { t: 'ui', v: 'node-cost' },
      { t: 'callout', k: 'warn', v: 'Generate audio isn’t available on shared team accounts yet. See <a href="#/article/ts-team-accounts">this article</a>.' }
    ]},
  { id: 'archive-board', cat: 'studio', title: 'Archive a board and view archived boards', updated: '2026-10-21',
    summary: 'Tidy your Boards list by archiving boards you’re not using.',
    body: [
      { t: 'steps', v: [
        'In the Boards list, open the menu on the board you want to archive.',
        'Choose <b>Archive</b>.',
        'To see archived boards, turn on <b>Show archived</b>.'
      ]},
      { t: 'callout', k: 'warn', v: 'Seeing “Something went wrong. Try again.”? This is a known issue. See <a href="#/article/ts-archive-error">the fix</a>.' }
    ]},

  // ---------------- Troubleshooting
  { id: 'ts-archive-error', cat: 'troubleshooting', title: '“Something went wrong. Try again” when archiving a board', popular: true, known: true, updated: '2026-10-21',
    summary: 'Archiving a board or turning on Show archived can fail with a generic error.',
    body: [
      { t: 'h', v: 'What you see' },
      { t: 'p', v: 'When you archive a board, or turn on <b>Show archived</b> in the Boards list, a toast appears and nothing changes:' },
      { t: 'ui', v: 'toast-error' },
      { t: 'p', v: 'The board stays <span class="badge">Active</span>.' },
      { t: 'h', v: 'What to try' },
      { t: 'steps', v: [
        'Refresh the page and try once more.',
        'Sign out and back in. An expired session can cause this.',
        'If it still fails, leave the board as it is. Your work isn’t lost.',
        '<a href="#" data-contact>Contact support</a> with the board name and the time it happened.'
      ]},
      { t: 'callout', k: 'info', v: '<b>Known issue.</b> Our team is investigating. We’ll update this article when it’s fixed.' }
    ]},
  { id: 'ts-team-accounts', cat: 'troubleshooting', title: '“Studio doesn’t support shared team accounts yet”', popular: true, known: true, updated: '2026-10-21',
    summary: 'Why you see this message on a team account, and what you can do.',
    body: [
      { t: 'h', v: 'What you see' },
      { t: 'p', v: 'When you run a node in Studio, such as Generate audio, while signed in to a shared team account:' },
      { t: 'ui', v: 'toast-team' },
      { t: 'h', v: 'Why it happens' },
      { t: 'p', v: 'Studio generations currently run on individual accounts only. Team account support is on the way.' },
      { t: 'h', v: 'What you can do' },
      { t: 'list', v: [
        'Sign in with your individual account to use Studio.',
        'Use AI Agents for the same kind of output in the meantime.'
      ]}
    ]},
  { id: 'ts-not-enough-credits', cat: 'troubleshooting', title: 'Not enough credits to generate', popular: true, updated: '2026-10-21',
    summary: 'What to do when a generation needs more credits than you have.',
    body: [
      { t: 'p', v: 'Every generation shows its cost before you run it (for example, about 25 credits for an image in our testing). If your balance is lower than the cost, the generation won’t run.' },
      { t: 'ui', v: 'credits-low' },
      { t: 'h', v: 'What to try' },
      { t: 'steps', v: [
        '<a href="#/article/check-balance">Check your credit balance</a>.',
        'See your plan page for options to get more credits.',
        'Try a cheaper run while you iterate, such as fewer outputs or a shorter clip, where those settings are available.'
      ]},
      { t: 'callout', k: 'info', v: 'Placeholder: confirm the exact low-balance message and upgrade path with the billing team.', draft: true }
    ]},
  { id: 'ts-empty-prompt', cat: 'troubleshooting', title: 'Run button is enabled with an empty prompt', known: true, updated: '2026-10-21',
    summary: 'A Generate image node can show its credit cost even when the prompt is empty.',
    body: [
      { t: 'p', v: 'In Studio, a Generate image node can be run before you’ve written a prompt. It still shows the cost (for example, 25 credits).' },
      { t: 'callout', k: 'warn', v: 'Always add a prompt before you run a node, so you don’t spend credits on an unintended result.' }
    ]},
  { id: 'ts-slides-prompt', cat: 'troubleshooting', title: 'Clicking a Slides example doesn’t fill the prompt box', updated: '2026-10-21',
    summary: 'Slides cards are style presets, not prompts.',
    body: [
      { t: 'p', v: 'On the Slides agent, clicking a card such as “Cinematic Pitch Deck” selects a <b>style chip</b> and leaves the prompt box empty. This is expected: Slides cards set the visual style, and you describe the deck’s content.' },
      { t: 'h', v: 'Example' },
      { t: 'code', v: 'A 10-slide investor deck for Pulsefit, a mobile fitness app. Cover problem, solution, traction, business model, team and the ask.' },
      { t: 'p', v: 'See every Slides style in the <a href="#/agents/slides-agent">Slides Agent guide</a>.' }
    ]},
  { id: 'ts-needs-media', cat: 'troubleshooting', title: 'Example needs a photo or video', updated: '2026-10-21',
    summary: 'Edit and motion examples need you to attach your own file.',
    body: [
      { t: 'p', v: 'Cards badged <span class="badge badge-media">Needs photo</span>, <span class="badge badge-media">Needs video</span> or <span class="badge badge-media">Needs product photo</span> edit or animate your media, for example “Replace background”, “Bring portrait to life” or “Add snowfall”.' },
      { t: 'steps', v: [
        'Click the example card to fill the prompt.',
        'Attach the photo or video the prompt refers to.',
        'Send.'
      ]},
      { t: 'p', v: 'Find every example that needs media in the <a href="#/agents">AI Agents guide</a> (look for the badge).' }
    ]}
];
