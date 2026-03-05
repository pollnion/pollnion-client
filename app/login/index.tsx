import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

function getAuthErrorMessage(message: string): string {
  if (message.includes('Invalid login credentials')) return 'Invalid email or password.';
  if (message.includes('Email not confirmed'))
    return 'Please confirm your email before signing in.';
  return 'Something went wrong. Please try again.';
}

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(getAuthErrorMessage(signInError.message));
      } else {
        router.replace('/(tabs)');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Pollnion</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Welcome back</Text>

        {error && <Text style={[styles.error, { color: '#ef4444' }]}>{error}</Text>}

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.tabIconDefault,
              color: colors.text,
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
            },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.tabIconDefault}
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.tabIconDefault,
              color: colors.text,
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
            },
          ]}
          placeholder="Password"
          placeholderTextColor={colors.tabIconDefault}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: colors.text }]}>
            Don&apos;t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp} disabled={loading}>
            <Text style={[styles.signupLink, { color: colors.tint }]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
