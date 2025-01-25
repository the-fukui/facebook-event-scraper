import { fbidToUrl, validateAndFormatUrl } from '../url';

describe('fbidToUrl', () => {
  it('returns the correct URL for a valid FB ID', () => {
    const result = fbidToUrl('1234567890');
    expect(result).toEqual(
      'https://www.facebook.com/events/1234567890?_fb_noscript=1'
    );
  });

  it('throws an error for an invalid FB ID', () => {
    expect(() => fbidToUrl('1234567')).toThrow('Invalid FB ID');
  });
});

describe('validateAndFormatUrl', () => {
  it('returns the correct URL for a valid FB event URL without query parameters', () => {
    const result = validateAndFormatUrl(
      'https://www.facebook.com/events/1234567890/'
    );
    expect(result).toEqual(
      'https://www.facebook.com/events/1234567890?_fb_noscript=1'
    );
  });

  it('returns the correct URL for a valid FB event URL with query parameters', () => {
    const result = validateAndFormatUrl(
      'https://www.facebook.com/events/1234567890?some-param=value'
    );
    expect(result).toEqual(
      'https://www.facebook.com/events/1234567890?_fb_noscript=1'
    );
  });

  it('returns the correct URL for a valid FB event URL with event name in the path', () => {
    const result = validateAndFormatUrl(
      'https://www.facebook.com/events/some-group-name/some-event-name/1234567890/'
    );
    expect(result).toEqual(
      'https://www.facebook.com/events/1234567890?_fb_noscript=1'
    );
  });

  it('throws an error for an invalid FB event URL without event ID', () => {
    expect(() =>
      validateAndFormatUrl('https://www.facebook.com/events/')
    ).toThrow('Invalid Facebook event URL');
  });

  it('throws an error for an invalid FB event URL with invalid event ID', () => {
    expect(() =>
      validateAndFormatUrl('https://www.facebook.com/events/1234567')
    ).toThrow('Invalid Facebook event URL');
  });

  it('throws an error for an invalid URL', () => {
    expect(() =>
      validateAndFormatUrl('https://www.facebook.com/invalid-url')
    ).toThrow('Invalid Facebook event URL');
  });

  it('returns the correct URL for a valid short FB event URL without query parameters', () => {
    const result = validateAndFormatUrl('https://fb.me/e/ABCdef123');
    expect(result).toEqual('https://fb.me/e/ABCdef123?_fb_noscript=1');
  });

  it('returns the correct URL for a valid short FB event URL with query parameters', () => {
    const result = validateAndFormatUrl(
      'https://fb.me/e/ABCdef123?some-param=value'
    );
    expect(result).toEqual('https://fb.me/e/ABCdef123?_fb_noscript=1');
  });

  it('throws an error for an invalid short FB event URL without event ID', () => {
    expect(() => validateAndFormatUrl('https://fb.me/e/')).toThrow(
      'Invalid Facebook event URL'
    );
  });

  it('throws an error for an invalid short FB event URL with invalid event ID', () => {
    expect(() => validateAndFormatUrl('https://fb.me/e/ABCdef12')).toThrow(
      'Invalid Facebook event URL'
    );
  });

  it('throws an error for an invalid short URL', () => {
    expect(() => validateAndFormatUrl('https://fb.me/invalid-url')).toThrow(
      'Invalid Facebook event URL'
    );
  });
});
