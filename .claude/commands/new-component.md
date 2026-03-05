Create a new reusable React Native component for the Pollnion client project.

Component name: $ARGUMENTS

---

## Pre-flight Checks

Before creating the component:

1. Read `src/components/button.tsx` to understand the existing component patterns and conventions used in this project.
2. Read `src/__tests__/button.test.tsx` to understand the test patterns and what level of coverage is expected.
3. Check `src/constants/theme.ts` for available theme tokens (colors, spacing, typography) to use instead of hardcoded values.
4. Check whether a similar component already exists to avoid duplication.

---

## Steps to Follow

### 1. Create the component file at `src/components/$ARGUMENTS.tsx`

Structure requirements:

- Use a named `interface` or `type` for props — name it `${ComponentName}Props`. Do **not** use `any`.
- Export the component as a named export (not default).
- Use `StyleSheet.create()` for all styles — no inline style objects.
- Reference theme tokens from `src/constants/theme.ts` for colors, spacing, and typography.
- Keep the component focused and composable — one responsibility per component.
- Platform-specific variants (iOS/Android) should use `.ios.tsx` / `.android.tsx` suffixes if needed.

Import ordering:

```
1. React and React Native core
2. Expo libraries
3. Third-party libraries
4. Local imports (components, hooks, constants, utils)
```

Example structure:

```tsx
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

interface MyComponentProps {
  label: string;
  onPress?: () => void;
}

export function MyComponent({ label, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...
  },
  label: {
    // ...
  },
});
```

### 2. Create the test file at `src/__tests__/$ARGUMENTS.test.tsx`

Test requirements:

- Use `@testing-library/react-native` for rendering and querying.
- Cover all required props and their rendered output.
- Cover optional props — test both with and without them.
- Cover user interactions (e.g., `fireEvent.press`) for interactive components.
- Cover edge cases: empty strings, long text, disabled states, etc.
- Use `describe` blocks to group related tests.
- Use clear, behavior-oriented test names: `"renders the label text"`, not `"test 1"`.

Example structure:

```tsx
import { render, screen, fireEvent } from '@testing-library/react-native';

import { MyComponent } from '../components/my-component';

describe('MyComponent', () => {
  it('renders the label text', () => {
    render(<MyComponent label="Hello" />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<MyComponent label="Hello" onPress={onPress} />);
    fireEvent.press(screen.getByText('Hello'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without an onPress handler', () => {
    expect(() => render(<MyComponent label="Hello" />)).not.toThrow();
  });
});
```

### 3. Format the new files

```bash
npm run format
```

Fix any formatting issues before proceeding. Do not skip this step.

### 4. Lint the new files

```bash
npm run lint
```

Resolve all linting errors. Warnings should be reviewed — fix them if they relate to type safety or code quality.

### 5. Run the full test suite

```bash
npm test
```

All tests must pass, including any pre-existing tests. If a test fails, fix it before reporting completion.

---

## Completion Report

After all steps succeed, provide:

1. **Component file** — show the full contents of `src/components/$ARGUMENTS.tsx`
2. **Test file** — show the full contents of `src/__tests__/$ARGUMENTS.test.tsx`
3. **Test results** — confirm all tests passed (include the summary line from Jest output)
4. **Usage example** — show a short snippet demonstrating how to import and use the new component in a screen
