import formatArrayIntoSentence from './formatArrayIntoSentence';

describe('formatArrayIntoSentence', () => {
    it('returns empty string', () => {
        expect(formatArrayIntoSentence([])).toEqual('');
    });

    it('returns single item', () => {
        expect(formatArrayIntoSentence(['bob'])).toEqual('bob');
    });

    it('returns two items without commas', () => {
        expect(formatArrayIntoSentence(['bob', 'sam'])).toEqual('bob and sam');
    });

    it('returns three items with commas', () => {
        expect(formatArrayIntoSentence(['bob', 'sam', 'sarah'])).toEqual('bob, sam, and sarah');
    });
});
