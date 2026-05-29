const { h } = require("vue");

module.exports = {
  name: "PrimeVueStub",
  render() {
    const children = [];

    if (this.$slots.default) {
      children.push(this.$slots.default());
    }

    if (this.$slots.header) {
      children.push(this.$slots.header({}));
    }

    if (this.$slots.body) {
      children.push(
        this.$slots.body({ data: { image: "placeholder.png", price: 0 } }),
      );
    }

    return h("div", children);
  },
};
