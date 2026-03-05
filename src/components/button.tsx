import { StyleSheet, Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = TouchableOpacityProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const tint = useThemeColor({}, 'tint');
  const text = useThemeColor({}, 'text');

  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    variant === 'primary' && { backgroundColor: tint },
    variant === 'secondary' && [styles.secondary, { borderColor: tint }],
    variant === 'ghost' && styles.ghost,
    isDisabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.label,
    variant === 'primary' && styles.labelPrimary,
    variant === 'secondary' && { color: tint },
    variant === 'ghost' && { color: text },
  ];

  return (
    <TouchableOpacity style={containerStyle} disabled={isDisabled} activeOpacity={0.75} {...rest}>
      <Text style={labelStyle}>{loading ? 'Loading…' : label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelPrimary: {
    color: '#fff',
  },
});
