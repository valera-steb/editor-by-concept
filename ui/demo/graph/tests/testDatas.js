/**
 * Created by steb on 11.03.2016.
 */
define({
    t01: {
        s: '' +
        '1-2,3| ' +
        '2-3| ' +
        '3',

        r: '' +
        '1| ' +
        'l(2),  l(3)| ' +
        '2,     l(3)| ' +
        'l(3),  l(3)| ' +
        '3,     l(3)'
    },

    t02: '' +
    '1| ' +
    'b(x),  b(x) - x:[2, 3]| ' +
    'l(2),  b(3)| ' +
    '2,     b(3)| ' +
    'l(3),  b(3)| ' +
    'l(3),  l(3)| ' +
    '3,     c(3)',

    t03: '' +
    '1| ' +
    'b(x),  b(x),   b(x) - x:[2, 3, 4]| ' +
    'l(2),  b(y),   b(y) - y:[3, 4]| ' +
    '2,     b(y),   b(y) - y:[3, 4]| ' +
    'L(5),  b(y),   b(y) - y:[3, 4]| ' +
    'L(5),  L(3),   b(4)| ' +
    'L(5),  3,      b(4)| ' +
    'L(5),  L(5),   b(4)| ' +
    'L(5),  L(5),   L(4)| ' +
    'L(5),  L(5),   4| ' +
    'L(5),  L(5),   L(5)| ' +
    '5,     c(5),   c(5)'
});