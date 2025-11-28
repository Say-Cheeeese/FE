import { describe, expect, it } from 'vitest';
import { formatEventDate } from './formatEventDate';

describe('formatEventDate', () => {
  it('converts a valid ISO string to YYYY.MM.DD format', () => {
    const result = formatEventDate('2025-01-03T10:20:30Z');
    expect(result).toBe('2025.01.03');
  });

  it('handles a date without time (e.g., 2025-12-09)', () => {
    const result = formatEventDate('2025-12-09');
    expect(result).toBe('2025.12.09');
  });

  it('pads month and day with leading zeros', () => {
    const result = formatEventDate('2025-3-5');
    expect(result).toBe('2025.03.05');
  });

  it('returns empty string when date is undefined', () => {
    expect(formatEventDate(undefined)).toBe('');
  });

  it('returns empty string when date is null-ish or empty', () => {
    expect(formatEventDate('')).toBe('');
  });

  it('returns empty string for invalid date formats', () => {
    expect(formatEventDate('invalid-date')).toBe('');
    expect(formatEventDate('2025-99-99')).toBe('');
    expect(formatEventDate('hello world')).toBe('');
  });
});
