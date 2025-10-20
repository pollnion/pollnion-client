# Pollnion

Pollnion is a modern social media platform where users can create, share, and engage with polls on any topic imaginable. From lighthearted debates to serious discussions, if it sparks an opinion, it belongs on Pollnion.

## ✨ Key Features

- **Create Polls**: Easily create polls with titles, descriptions, multiple options, and tags.
- **Dynamic Voting**: Vote on polls and see results update in real-time.
- **Search & Discover**: Find users, polls, and spaces using a comprehensive search functionality.
- **User Profiles**: Follow users and view their activity.
- **Community Spaces**: Engage in dedicated topic-based spaces.
- **Responsive Design**: A seamless experience on both desktop and mobile devices.
- **Light & Dark Mode**: Switch between themes for your viewing comfort.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **List Virtualization**: [React Virtuoso](https://virtuoso.dev/) for rendering large feeds efficiently
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Linting & Formatting**: ESLint & Prettier
- **Deployment**: Vercel with CI/CD via GitHub Actions

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (version `22.19.0` recommended, see `.nvmrc`)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pollnion/pollnion-client.git
    cd pollnion-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.development.local` in the root directory and add the necessary environment variables. You will need a public image hosting link for `NEXT_PUBLIC_IMAGE_LINK`.

    ```
    NEXT_PUBLIC_IMAGE_LINK=https://i.ibb.co
    ```

    Request from the owner of this repository for other sensitive keys.

4.  **Run the development server:**
    The application will be available at `http://localhost:8080`.
    ```bash
    npm run dev
    ```

## 📜 Available Scripts

The `package.json` file includes several scripts for development and maintenance:

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats code with Prettier.
- `npm run check`: Runs linting, type-checking, and formatting.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

## 👨‍💻 AUTHOR

Charli — just a normie front-end dev dude who likes building fun stuff.
If it makes the internet more interactive, I’m probably into it.

## Pollnion

— where opinions meet polls.
