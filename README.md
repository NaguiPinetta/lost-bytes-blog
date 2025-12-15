# Lost Bytes

A public notebook — notes, experiments, and fragments I didn't want to lose.

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321` (or the port shown in terminal).

## Commands

| Command                | Action                                    |
| :--------------------- | :---------------------------------------- |
| `npm install`          | Installs dependencies                     |
| `npm run dev`          | Starts local dev server at `localhost:4321` |
| `npm run build`        | Build your production site to `./dist/`   |
| `npm run preview`      | Preview your build locally                 |
| `npm run format:check` | Check code format with Prettier           |
| `npm run format`       | Format codes with Prettier                |
| `npm run sync`         | Generates TypeScript types for Astro      |
| `npm run lint`         | Lint with ESLint                          |

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and icons
│   ├── components/  # Astro components
│   ├── data/        # Blog posts (Markdown)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes
│   ├── styles/      # Global styles
│   └── utils/       # Utility functions
└── astro.config.ts  # Astro configuration
```

All blog posts are stored in `src/data/blog` directory.

## Deploy to Vercel

1. Import your repository into Vercel
2. Configure the project:
   - **Framework Preset**: Astro
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Development Command**: `npm run dev`
3. Deploy

Vercel will automatically detect Astro and configure the build settings. After deployment, update the `site` URL in `src/config.ts` with your final Vercel domain.

## Credits

Originally based on [AstroPaper](https://github.com/satnaing/astro-paper), modified for this project.
