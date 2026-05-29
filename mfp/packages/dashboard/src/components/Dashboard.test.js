import { mount } from "@vue/test-utils";
import Dashboard from "./Dashboard.vue";

describe("Dashboard", () => {
  it("renders the summary metrics", () => {
    const wrapper = mount(Dashboard);

    expect(wrapper.find(".visitors").text()).toBe("12");
    expect(wrapper.find(".purchases").text()).toBe("534");
    expect(wrapper.find(".revenue").text()).toBe("$3,200");
  });

  it("formats product prices as US dollars", () => {
    const wrapper = mount(Dashboard);

    expect(wrapper.vm.formatCurrency(3200)).toBe("$3,200.00");
  });
});
