module.exports.default = (foo, bar) => foo + bar;

module.exports.ftwo = (foo, bar, baz) => {
  if (foo != null && bar != null && baz != null) {
    return foo + bar + baz;
  } else {
    return foo;
  }
};

exports.fthree = (foo) => "a";
