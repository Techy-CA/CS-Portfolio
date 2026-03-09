// src/data/portfolioData.ts

export const personal = {
  name: "Chinmay Sugandhi",
  title: "Software Engineer",
  subtitle: "BTech Computer Engineering",
  location: "India",
  tags: ["Builder", "Developer", "Founder"],

  // ── Avatar (ProfileCard ke liye) ──
  avatar: "/portfoliophoto.JPG", // apni photo yahan daalo — public/ folder mein rakhna

  // Hero — short & punchy
  heroBio: `I build systems, software, and digital products. Currently experimenting with automation, team tools, and scalable platforms.`,

  // About — full story
  bio1: `I'm a builder interested in creating technology that solves real operational problems. I work across software development, automation, and digital systems - focusing on tools that make teams more efficient.`,
  bio2: `I have experience managing web projects and working with development teams, where I learned how products move from an idea to a working system. Currently building and experimenting with products in team management software, automation tools, and digital platforms.`,
  bio3: `Apart from development, I'm also involved in FRNT Media - working on software solutions, influencer marketing, and digital growth systems for businesses.`,
  bio4: `Right now my focus is simple: build useful products, learn fast, and solve real problems with technology.`,

  email: "chinmayysugandhi@gmail.com",
  github: "https://github.com/chinmaysugandhi",
  linkedin: "https://linkedin.com/in/chinmaysugandhi",
  twitter: "https://twitter.com/chinmaysugandhi",
};

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "DevConnect",
    description: "A developer networking platform built with React, Node.js and MongoDB. Real-time chat, project collaboration, and skill matching.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "#",
    live: "#",
    color: "#3a86ff",
  },
  {
    title: "AlgoVisualizer",
    description: "Interactive algorithm visualization tool. Visualize sorting, graph traversal, and pathfinding algorithms step-by-step.",
    tags: ["TypeScript", "React", "Canvas API"],
    github: "#",
    live: "#",
    color: "#2a9d5c",
  },
  {
    title: "BudgetBuddy",
    description: "Personal finance tracker with smart categorization, charts, and monthly insights. Built with React and Firebase.",
    tags: ["React", "Firebase", "Recharts"],
    github: "#",
    live: "#",
    color: "#e63946",
  },
  {
    title: "CodeSnap",
    description: "Beautiful code screenshot generator. Supports 50+ languages, themes, and export formats. Made for developers.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "#",
    color: "#ff9f1c",
  },
];

export const skills = {
  "Languages":      ["C++", "Python", "TypeScript", "JavaScript", "Java"],
  "Frontend":       ["React.js", "Next.js", "HTML/CSS", "Tailwind CSS", "Framer Motion"],
  "Backend":        ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  "Database":       ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
  "Tools & Others": ["Git", "Docker", "Linux", "VS Code", "Figma"],
};
