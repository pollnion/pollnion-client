import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

export default function SignupScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Sign up with Supabase Auth
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        // Redirect to login or home (depends on email confirmation requirement)
        router.replace('/login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Join Pollnion today</Text>

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
          placeholder="Username"
          placeholderTextColor={colors.tabIconDefault}
          value={username}
          onChangeText={setUsername}
          editable={!loading}
          autoCapitalize="none"
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
          placeholder="Password (min 6 characters)"
          placeholderTextColor={colors.tabIconDefault}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.text }]}>Already have an account? </Text>
          <TouchableOpacity onPress={handleBack} disabled={loading}>
            <Text style={[styles.loginLink, { color: colors.tint }]}>Sign in</Text>
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
