import { HttpHeaders } from '@angular/common/http';
import { IAsymmetricMatcher } from './jasmineAsymmetricMatcher';

export class HttpHeadersMatcher implements IAsymmetricMatcher {

    constructor(private check: { [name: string]: string }) {
    }

    public asymmetricMatch(options: any): boolean {
        const headers: HttpHeaders = options.headers;
        expect(options.observe).toBe('response');

        Object.keys(this.check)
            .forEach((key: string) => {
                expect(headers.get(key)).toBe(this.check[key]);
            });

        return true;
    }

    public jasmineToString(): string {
        return `<HeaderMatching: ${JSON.stringify(this.check)}>`;
    }
}
