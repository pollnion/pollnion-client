# Frontend Patterns — Pollnion Client

This document describes the frontend patterns, conventions, and component architecture used in the Pollnion React Native (Expo) app. Follow these patterns consistently when building or modifying UI code.

---

## Tech Stack

- **React Native** with **Expo** (managed workflow)
- **TypeScript** — strict typing, no `any`
- **Expo Router** — file-based routing
- **react-native-reanimated** — animations
- **Supabase** — auth and backend
- **React Testing Library** + **Jest** — testing

---

## 1. Component Structure

### Reusable components → `src/components/`

### Screen components → `app/**/*.tsx`

**Reusable component** (named export):

```tsx
import { StyleSheet, View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type MyComponentProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  label: string;
};

export function MyComponent({ style, lightColor, darkColor, label, ...rest }: MyComponentProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...rest}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

**Screen component** (default export):

```tsx
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function MyScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

---

## 2. Import Order

Always organize imports in this order:

```tsx
// 1. React
import React, { useState, useEffect } from 'react';

// 2. React Native core
import { StyleSheet, View, Text } from 'react-native';

// 3. Expo packages
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

// 4. Third-party libraries
import Animated from 'react-native-reanimated';

// 5. Local — components
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

// 6. Local — hooks, constants, lib
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
```

Use the `@/` path alias (maps to `src/`) for all local imports.

---

## 3. Theming & Dark Mode

### Themed wrapper components

Always use `ThemedView` and `ThemedText` instead of raw `View` and `Text` for themed UI:

```tsx
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

// ThemedText variants: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
<ThemedText type="title">Hello</ThemedText>
<ThemedText type="defaultSemiBold">Bold text</ThemedText>
<ThemedView>...</ThemedView>
```

### useThemeColor hook

For custom themed styles inside a component:

```tsx
import { useThemeColor } from '@/hooks/use-theme-color';

const backgroundColor = useThemeColor({ light: '#fff', dark: '#111' }, 'background');
const textColor = useThemeColor({}, 'text');
```

### useColorScheme hook

For conditional logic based on the current theme:

```tsx
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme(); // 'light' | 'dark' | null
const colors = Colors[colorScheme ?? 'light'];
```

### Colors & Fonts constants

```tsx
import { Colors, Fonts } from '@/constants/theme';

// Colors
Colors.light.text; // '#11181C'
Colors.light.background; // '#fff'
Colors.light.tint; // '#0a7ea4'
Colors.light.icon; // '#687076'

// Fonts (platform-aware)
Fonts.sans; // system-ui
Fonts.serif; // ui-serif
Fonts.rounded; // ui-rounded
Fonts.mono; // ui-monospace
```

---

## 4. Styling

Always use `StyleSheet.create` — define styles **outside the component**:

```tsx
export function MyComponent() {
  return <View style={styles.container} />;
}

// ✅ Outside component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
});
```

For dynamic/themed values, merge with an inline style object:

```tsx
<View style={[styles.container, { backgroundColor: colors.background }]} />
```

---

## 5. Expo Router — File-Based Routing

### Route structure

```
app/
├── _layout.tsx          # Root layout (Stack navigator + ThemeProvider)
├── modal.tsx            # Modal screen
├── (tabs)/
│   ├── _layout.tsx      # Tab navigator layout
│   ├── index.tsx        # /  (Home tab)
│   └── explore.tsx      # /explore tab
├── login/
│   └── index.tsx        # /login
└── signup/
    └── index.tsx        # /signup
```

### Navigation

```tsx
import { useRouter, Link } from 'expo-router';

// Programmatic
const router = useRouter();
router.push('/signup');
router.replace('/(tabs)');

// Declarative
<Link href="/signup">Sign up</Link>
<Link href="/" dismissTo>Go home</Link>
```

### Root layout pattern

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
```

---

## 6. Platform-Specific Files

Use `.ios.tsx` / `.android.tsx` / `.web.ts` suffixes for platform-specific implementations. Expo automatically picks the right one.

```
icon-symbol.ios.tsx   ← used on iOS (SF Symbols via expo-symbols)
icon-symbol.tsx       ← used on Android/web (Material Icons fallback)
```

```tsx
// icon-symbol.ios.tsx
import { SymbolView } from 'expo-symbols';

// icon-symbol.tsx (fallback)
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
```

For inline platform branching:

```tsx
import { Platform } from 'react-native';

Platform.select({
  ios: 'cmd + d',
  android: 'cmd + m',
  web: 'F12',
});
```

---

## 7. Forms & Auth Pattern

Pattern used in `app/login/index.tsx` and `app/signup/index.tsx`:

```tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: apiError } = await supabase.auth.signInWithPassword({ email, password });
      if (apiError) setError(apiError.message);
      else router.replace('/(tabs)');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
        placeholder="Email"
        placeholderTextColor={colors.icon}
        value={email}
        onChangeText={setEmail}
        editable={!loading}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading…' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## 8. Animations

Use `react-native-reanimated` for animations:

```tsx
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

const scrollRef = useAnimatedRef<Animated.ScrollView>();
const scrollOffset = useScrollOffset(scrollRef);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: interpolate(scrollOffset.value, [0, 100], [0, -50]) }],
}));

<Animated.View style={animatedStyle} />;
```

CSS-style animations (web/Expo):

```tsx
<Animated.Text
  style={{
    animationName: { '50%': { transform: [{ rotate: '25deg' }] } },
    animationIterationCount: 4,
    animationDuration: '300ms',
  }}
/>
```

---

## 9. Hooks

### Custom hook naming

Prefix with `use`, place in `src/hooks/`:

```
use-color-scheme.ts
use-color-scheme.web.ts   ← web override (SSR hydration safe)
use-theme-color.ts
```

### Hook pattern

```tsx
import { useEffect, useState } from 'react';

export function useMyHook(input: string) {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // side effect
  }, [input]);

  return result;
}
```

---

## 10. Naming Conventions

| Type                | Convention                          | Example                                 |
| ------------------- | ----------------------------------- | --------------------------------------- |
| Components          | PascalCase                          | `PollCard`, `VoteButton`                |
| Screens             | PascalCase function, default export | `export default function LoginScreen()` |
| Hooks               | camelCase, `use` prefix             | `useColorScheme`, `usePollData`         |
| Files (components)  | kebab-case                          | `poll-card.tsx`, `vote-button.tsx`      |
| Files (hooks)       | kebab-case with `use-`              | `use-poll-data.ts`                      |
| Constants           | UPPER_SNAKE_CASE                    | `MAX_POLL_OPTIONS`                      |
| Variables/functions | camelCase                           | `pollData`, `handleVote`                |
| Types/interfaces    | PascalCase                          | `PollCardProps`, `VoteOption`           |

---

## 11. Existing Shared Components

| Component            | Import                              | Use for                                 |
| -------------------- | ----------------------------------- | --------------------------------------- |
| `ThemedText`         | `@/components/themed-text`          | All text (dark/light aware)             |
| `ThemedView`         | `@/components/themed-view`          | All views (dark/light aware)            |
| `IconSymbol`         | `@/components/ui/icon-symbol`       | Icons (SF Symbols / Material)           |
| `Collapsible`        | `@/components/ui/collapsible`       | Expandable sections                     |
| `ExternalLink`       | `@/components/external-link`        | Links that open in-app browser          |
| `ParallaxScrollView` | `@/components/parallax-scroll-view` | Scrollable screens with animated header |
| `HapticTab`          | `@/components/haptic-tab`           | Tab bar buttons with haptic feedback    |
