var Lens = require('fantasy-lenses').Lens,
    lens = Lens.objectLens,

    combinators = require('fantasy-combinators'),
    compose = combinators.compose;

function merge(a, b) {
    return function(o) {
        return lens(a).run(o).set(lens(b).run(o).get());
    };
}

// Cauldron pot

function applicative(a, b) {
    return function(x, y) {
        return compose(merge(a, b))(apply(x, y));
    };
}

function apply(a, b) {
    return function(x, y) {
        return compose(merge(a, b))(functor(x, y));
    };
}

function chain(a, b) {
    return function(x, y) {
        return compose(merge(a, b))(apply(x, y));
    };
}

exports.Proto = {
    applicative: applicative('of', 'fantasyland.of')('apply', 'fantasyland.apply'),
    apply: apply('apply', 'fantasyland.apply')('map', 'fantasyland.map'),
    chain: chain('chain', 'fantasyland.chain')('apply', 'fantasyland.apply'),

    extend: merge('extend', 'fantasyland.extend'),
    extend: merge('extract', 'fantasyland.extract'),
    functor: merge('map', 'fantasyland.map'),
    monoid: merge('empty', 'fantasyland.empty'),
    semigroup: merge('concat', 'fantasyland.concat'),
    setoid: merge('equals', 'fantasyland.equals'),

    comonad: compose(extend)(extract),
    monad: compose(applicative)(chain)
};

exports.Namespace = {
    applicative: applicative('fantasyland.of', 'of')('fantasyland.apply', 'apply'),
    apply: apply('fantasyland.apply', 'apply')('fantasyland.map', 'map'),
    chain: chain('fantasyland.chain', 'chain')('fantasyland.apply', 'apply'),

    extend: merge('fantasyland.extend', 'extend'),
    extend: merge('fantasyland.extract', 'extract'),
    functor: merge('fantasyland.map', 'map'),
    monoid: merge('fantasyland.empty', 'empty'),
    semigroup: merge('fantasyland.concat', 'concat'),
    setoid: merge('fantasyland.equals', 'equals'),

    comonad: compose(extend)(extract),
    monad: compose(applicative)(chain)
};

exports.merge = merge;