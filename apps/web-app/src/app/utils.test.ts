import { getLoginRedirectPath } from './utils';

describe('app/utils', () => {
  describe('#getLoginRedirectUrl', () => {
    const pathname = '/some/path';
    const search = '?key=value';
    const hash = '#hash';

    it('should return the path', () => {
      const redirectUrl = getLoginRedirectPath({ pathname });

      expect(redirectUrl).toEqual('/auth/login?path=%2Fsome%2Fpath');
    });

    it('should concatenate the path and search', () => {
      const redirectUrl = getLoginRedirectPath({ pathname, search });

      expect(redirectUrl).toEqual(
        '/auth/login?path=%2Fsome%2Fpath&search=%3Fkey%3Dvalue',
      );
    });

    it('should concatenate the path and hash', () => {
      const redirectUrl = getLoginRedirectPath({ pathname, hash });

      expect(redirectUrl).toEqual(
        '/auth/login?path=%2Fsome%2Fpath&hash=%23hash',
      );
    });

    it('should concatenate the path, search and hash', () => {
      const redirectUrl = getLoginRedirectPath({ pathname, search, hash });

      expect(redirectUrl).toEqual(
        '/auth/login?path=%2Fsome%2Fpath&hash=%23hash&search=%3Fkey%3Dvalue',
      );
    });
  });
});
