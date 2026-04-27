import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';

const seedData = async () => {
  try {
    // Connect to DB
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected!');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data...');

    // ── Skills ─────────────────────────────────────────────────────────────
    const skills = [
      // Frontend
      { name: 'React',        category: 'frontend', level: 10, years: 4, color: '#61DAFB' },
      { name: 'JavaScript',   category: 'frontend', level: 10, years: 4, color: '#F7DF1E' },
      { name: 'Tailwind CSS', category: 'frontend', level: 9,  years: 3, color: '#06B6D4' },
      { name: 'HTML/CSS',     category: 'frontend', level: 10, years: 5, color: '#E34F26' },
      // Backend
      { name: 'Node.js',      category: 'backend',  level: 10, years: 4, color: '#339933' },
      { name: 'Express.js',   category: 'backend',  level: 10, years: 4, color: '#000000' },
      { name: 'REST APIs',    category: 'backend',  level: 9,  years: 4, color: '#6B7280' },
      { name: 'Hono',         category: 'backend',  level: 8,  years: 1, color: '#E36002' },
      // Database
      { name: 'MongoDB',      category: 'database', level: 9,  years: 3, color: '#47A248' },
      { name: 'Pinecone',     category: 'database', level: 7,  years: 1, color: '#000000' },
      // DevOps
      { name: 'Cloudflare Workers', category: 'devops', level: 8, years: 1, color: '#F48120' },
      { name: 'Vercel',       category: 'devops',   level: 9,  years: 2, color: '#000000' },
      { name: 'Docker',       category: 'devops',   level: 7,  years: 2, color: '#2496ED' },
      { name: 'Git',          category: 'devops',   level: 10, years: 5, color: '#F05032' },
      // AI/ML
      { name: 'OpenAI API',   category: 'other',    level: 8,  years: 1, color: '#10A37F' },
      { name: 'Stripe',       category: 'other',    level: 8,  years: 2, color: '#635BFF' },
    ];

    await Skill.insertMany(skills);
    console.log('Seeded skills');

    // ── Projects ────────────────────────────────────────────────────────────
    const projects = [
      // ── 1. Brew & Bits ──────────────────────────────────────────────────
      {
        title: 'Brew & Bits',
        slug: 'brew-and-bits',
        description: 'Production-ready full-stack cafe website with Stripe payments, JWT authentication, order management, table reservations, and an admin panel.',
        longDescription: 'Brew & Bits is a production-grade MERN stack cafe website built with MongoDB, Express, React, and Node.js. It features JWT-based authentication with refresh tokens, a Stripe checkout flow for ordering food & drinks, a real-time cart system, table reservation scheduling, an email notification service (Nodemailer), and a comprehensive admin dashboard for managing orders, menu items, and customers. Fully responsive and deployed on Vercel.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop'
        ],
        tags: ['mern', 'stripe', 'jwt', 'mongodb', 'express', 'react'],
        category: 'fullstack',
        featured: true,
        liveUrl: 'https://bew-and-bits.vercel.app/',
        githubUrl: 'https://github.com/abhay-a-nayak2305/Cafe',
        challenges: [
          {
            title: 'Stripe Webhooks',
            description: 'Handling payment confirmation reliably without double-processing orders on network retries.'
          },
          {
            title: 'JWT Refresh Flow',
            description: 'Implementing a secure silent token refresh without logging users out mid-session.'
          }
        ],
        solutions: [
          {
            title: 'Idempotent Webhook Handler',
            description: 'Used Stripe event IDs stored in MongoDB to deduplicate webhook events before processing.'
          },
          {
            title: 'HttpOnly Cookie Rotation',
            description: 'Stored refresh tokens in HttpOnly cookies and issued new access tokens transparently on each request.'
          }
        ],
        techStack: [
          { name: 'React',      category: 'frontend' },
          { name: 'Node.js',    category: 'backend'  },
          { name: 'Express.js', category: 'backend'  },
          { name: 'MongoDB',    category: 'database' },
          { name: 'Stripe',     category: 'other'    },
          { name: 'Vercel',     category: 'devops'   }
        ],
        metrics: [
          { label: 'Auth flow', value: 'JWT + Refresh' },
          { label: 'Payments',  value: 'Stripe'        },
          { label: 'Deployed',  value: 'Vercel'        }
        ],
        timeline: {
          started:   new Date('2025-01-01'),
          completed: new Date('2025-03-01'),
          duration:  '2 months'
        },
        isPublished: true,
        featured: true,
        order: 1,
        views: 0
      },

      // ── 2. AI Resume Suite ───────────────────────────────────────────────
      {
        title: 'AI Resume Suite',
        slug: 'ai-resume-suite',
        description: 'Privacy-first AI resume analyser & builder optimised for Cloudflare\'s global network — elite-level ATS scoring and smart suggestions, free forever.',
        longDescription: 'AI Resume Suite is a privacy-first, serverless resume platform running entirely on Cloudflare Workers. Users upload or paste their resume and job description; the platform returns ATS compatibility scores, keyword gap analysis, tailored improvement suggestions, and a one-click resume rebuild powered by the OpenAI API. No data is stored server-side — all processing is ephemeral. The frontend is a React SPA built with Vite, communicating with a Hono-based Worker backend. Pinecone is used for semantic similarity search against a curated job-description dataset.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop'
        ],
        tags: ['ai', 'openai', 'cloudflare-workers', 'hono', 'pinecone', 'react', 'vite'],
        category: 'fullstack',
        featured: true,
        liveUrl: 'https://resume.smartgadgetfinds23.workers.dev/',
        githubUrl: 'https://github.com/abhay-a-nayak2305/resume',
        challenges: [
          {
            title: 'Cloudflare Worker Constraints',
            description: 'Cloudflare Workers have no filesystem, limited CPU time, and no Node.js APIs — required rethinking the entire backend architecture.'
          },
          {
            title: 'Pinecone Embedding Dimensions',
            description: 'Synchronising embedding model dimensions (2048) between the seeding script and live query pipeline to avoid dimension mismatch errors.'
          }
        ],
        solutions: [
          {
            title: 'Hono on Workers',
            description: 'Migrated from Express to Hono — a lightweight, edge-native framework with zero Node.js dependencies.'
          },
          {
            title: 'Consistent Embedding Pipeline',
            description: 'Pinned the same text-embedding model in both the seed script and the Worker so dimensions always match.'
          }
        ],
        techStack: [
          { name: 'React',              category: 'frontend'  },
          { name: 'Hono',               category: 'backend'   },
          { name: 'Cloudflare Workers', category: 'devops'    },
          { name: 'OpenAI API',         category: 'other'     },
          { name: 'Pinecone',           category: 'database'  },
          { name: 'Vite',               category: 'frontend'  }
        ],
        metrics: [
          { label: 'Hosting',    value: 'Cloudflare Workers' },
          { label: 'AI Engine',  value: 'OpenAI GPT-4o'      },
          { label: 'Vector DB',  value: 'Pinecone'           },
          { label: 'Privacy',    value: 'Zero data stored'   }
        ],
        timeline: {
          started:   new Date('2025-02-01'),
          completed: new Date('2025-04-01'),
          duration:  '2 months'
        },
        isPublished: true,
        featured: true,
        order: 2,
        views: 0
      },

      // ── 3. Career Path AI ────────────────────────────────────────────────
      {
        title: 'Career Path AI',
        slug: 'career-path-ai',
        description: 'Privacy-first AI platform that analyses your profile and tells you exactly what to learn to land your target role.',
        longDescription: 'Career Path AI is a serverless AI career advisor deployed on Cloudflare Workers. Users describe their current skills and target job role; the platform uses OpenAI to generate a personalised skill-gap report, a prioritised learning roadmap with free resource links, and interview preparation tips. The backend is a Hono Worker that keeps all inference ephemeral — no personal data is persisted. A React + Vite frontend provides a clean, fast UX with dark-mode support. The platform is fully free and requires no account.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop'
        ],
        tags: ['ai', 'openai', 'cloudflare-workers', 'hono', 'react', 'career'],
        category: 'fullstack',
        featured: true,
        liveUrl: 'https://careerpath.smartgadgetfinds23.workers.dev/',
        githubUrl: 'https://github.com/abhay-a-nayak2305/Career',
        challenges: [
          {
            title: 'Prompt Engineering for Career Advice',
            description: 'Crafting prompts that produce structured, actionable roadmaps rather than generic career platitudes.'
          },
          {
            title: 'Edge Deployment Latency',
            description: 'Minimising cold-start and streaming latency while calling the OpenAI API from a Cloudflare Worker.'
          }
        ],
        solutions: [
          {
            title: 'Structured Output Prompting',
            description: 'Used JSON-mode output with explicit section headers (gap analysis, roadmap, resources) and parsed the response client-side for clean rendering.'
          },
          {
            title: 'Server-Sent Events Streaming',
            description: 'Streamed the OpenAI response directly to the browser over SSE so the user sees output token-by-token with no wait.'
          }
        ],
        techStack: [
          { name: 'React',              category: 'frontend' },
          { name: 'Hono',               category: 'backend'  },
          { name: 'Cloudflare Workers', category: 'devops'   },
          { name: 'OpenAI API',         category: 'other'    },
          { name: 'Vite',               category: 'frontend' }
        ],
        metrics: [
          { label: 'Hosting',   value: 'Cloudflare Workers' },
          { label: 'AI Engine', value: 'OpenAI GPT-4o'      },
          { label: 'Latency',   value: 'SSE streaming'      },
          { label: 'Cost',      value: 'Free forever'       }
        ],
        timeline: {
          started:   new Date('2025-03-01'),
          completed: new Date('2025-04-15'),
          duration:  '6 weeks'
        },
        isPublished: true,
        featured: true,
        order: 3,
        views: 0
      }
    ];

    await Project.insertMany(projects);
    console.log('Seeded projects');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();