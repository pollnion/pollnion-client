Create a new screen/route for the Pollnion client app using Expo Router file-based routing.

Screen name/path: $ARGUMENTS

Steps to follow:

1. Create the screen file at `app/$ARGUMENTS/index.tsx` using TypeScript and React Native
2. Follow project conventions:
   - Use PascalCase for the component name
   - Use camelCase for props/variables
   - Add TypeScript types (no `any`)
   - Organize imports: React → external libraries → local imports
3. If the screen requires navigation, wire it up using Expo Router conventions
4. Run `npm run format` to format the new file
5. Run `npm run lint` to check for lint issues
6. Run `npm test` to verify nothing is broken

Show the created file contents and report the result of each step.
