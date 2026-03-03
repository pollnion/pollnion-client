describe('Example Test Suite', () => {
  it('should perform basic arithmetic', () => {
    expect(2 + 2).toBe(4);
  });

  it('should compare strings', () => {
    const greeting = 'Hello, World!';
    expect(greeting).toContain('World');
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('success');
    await expect(promise).resolves.toBe('success');
  });
});
