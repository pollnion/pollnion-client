# Pollnion Client

A modern React Native mobile application built with Expo for polling and surveys.

## Overview

Pollnion Client is a cross-platform mobile application that enables users to create, manage, and participate in polls and surveys. Built with [Expo](https://expo.dev) and React Native, it provides a seamless experience across iOS, Android, and web platforms.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) with [React Native](https://reactnative.dev)
- **Routing**: [Expo Router](https://expo.dev/router) (file-based routing)
- **Navigation**: [React Navigation](https://reactnavigation.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Testing**: [Jest](https://jestjs.io) with [React Testing Library](https://testing-library.com/react)
- **Code Formatting**: [Prettier](https://prettier.io)
- **Linting**: [ESLint](https://eslint.org)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI (optional, can use `npx expo`)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open the app in your preferred environment:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Launch on Android emulator
- `npm run ios` - Launch on iOS simulator
- `npm run web` - Launch on web
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run Jest tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run reset-project` - Reset project to blank state

## Project Structure

```
pollnion-client/
├── app/                    # App screens and routes (file-based routing)
├── src/                    # Source code
│   └── __tests__/         # Test files
├── scripts/               # Utility scripts
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup file
├── tsconfig.json          # TypeScript configuration
├── .prettierrc             # Prettier configuration
└── package.json           # Project dependencies
```

## Development

### Code Formatting

This project uses Prettier for consistent code formatting. Format your code before committing:

```bash
npm run format
```

### Running Tests

Write tests for your components and utilities:

```bash
npm test                # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # View coverage report
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

This project is private.
