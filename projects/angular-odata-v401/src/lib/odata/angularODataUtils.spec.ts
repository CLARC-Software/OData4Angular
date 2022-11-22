import { ODataUtils } from './angularODataUtils';

describe('ODataUtils', () => {

    it('quoteValue string', () => {
        // Act
        const value: string = ODataUtils.quoteValue('test');

        // Assert
        expect(value).toBe(`'test'`);
    });

    it('quoteValue string with quotes', () => {
        // Act
        const value: string = ODataUtils.quoteValue('te\'st\'');

        // Assert
        expect(value).toBe(`'te\'\'st\'\''`);
    });

    it('quoteValue boolean', () => {
        // Act
        const value: string = ODataUtils.quoteValue(true);

        // Assert
        expect(value).toBe(`true`);
    });

    it('quoteValue integer', () => {
        // Act
        const value: string = ODataUtils.quoteValue(10);

        // Assert
        expect(value).toBe('10');
    });

    it('quoteValue double', () => {
        // Act
        const value: string = ODataUtils.quoteValue(-10.01);

        // Assert
        expect(value).toBe('-10.01');
    });

    it('quoteValue GUID', () => {
        // Act
        const value: string = ODataUtils.quoteValue('eefea99a-c988-44b8-ac37-b326a489c1e3');

        // Assert
        expect(value).toBe('eefea99a-c988-44b8-ac37-b326a489c1e3');
    });

    it('convertObjectToString', () => {
        // Act
        const value: string = ODataUtils.convertObjectToString(
          { str: 'abc', int: 10, double: -10.01, guid: 'eefea99a-c988-44b8-ac37-b326a489c1e3', omitted: undefined });

        // Assert
        expect(value).toBe(`str='abc', int=10, double=-10.01, guid=eefea99a-c988-44b8-ac37-b326a489c1e3`);
    });

});
