var combinators = require('fantasy-combinators'),

    compose = combinators.compose;

// Cauldron pot

function applicative(o) {
    var x = function(o) {
       o.prototype.of = o.prototype['@@fantasy-land/of'];
        return o; 
    };
    return compose(x)(apply)(o);
}
exports.applicative = applicative;

function apply(o) {
    var x = function(o) {
       o.prototype.ap = o.prototype['@@fantasy-land/ap'];
        return o; 
    };
    return compose(x)(functor)(o);
}
exports.apply = apply;

function chain(o) {
    var x = function(o) {
       o.prototype.chain = o.prototype['@@fantasy-land/chain'];
        return o; 
    };
    return compose(x)(apply)(o);
}
exports.chain = chain;

function extend(o) {
    o.prototype.extend = o.prototype['@@fantasy-land/extend'];
    return o;
}
exports.extend = extend;

function extend(o) {
    o.prototype.extract = o.prototype['@@fantasy-land/extract'];
    return o;
}
exports.extend = extend;

function functor(o) {
    o.prototype.map = o.prototype['@@fantasy-land/map'];
    return o;
}
exports.functor = functor;

function monoid(o) {
    o.prototype.empty = o.prototype['@@fantasy-land/empty'];
    return o;
}
exports.monoid = monoid;

function semigroup(o) {
    o.prototype.concat = o.prototype['@@fantasy-land/concat'];
    return o;
}
exports.semigroup = semigroup;

function setoid(o) {
    o.prototype.equals = o.prototype['@@fantasy-land/equals'];
    return o;
}
exports.setoid = setoid;

exports.comonad = compose(extend)(extract)(o);
exports.monad = compose(applicative)(chain);