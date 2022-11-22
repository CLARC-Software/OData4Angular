import { HttpParams } from '@angular/common/http';
import { HttpHeadersMatcher } from './httpHeadersMatcher';
import { IAsymmetricMatcher } from './jasmineAsymmetricMatcher';

export class HttpOptionsMatcher implements IAsymmetricMatcher {

    constructor(private params: HttpParams, private headerMatcher?: HttpHeadersMatcher) {
    }

    public asymmetricMatch(options: any): boolean {
        expect(options.observe).toBe('response');
        expect(this.params).toEqual(options.params);

        if (this.headerMatcher) {
            return this.headerMatcher.asymmetricMatch(options);
        }

        return true;
    }

    public jasmineToString(): string {
        return `<HttpOptionsMatcher>`;
    }
}
