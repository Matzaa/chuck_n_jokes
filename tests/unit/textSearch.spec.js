import { shallowMount } from "@vue/test-utils";
import TextSearch from "@/components/TextSearch.vue";

describe("TextSearch.vue", () => {
    let wrapper = shallowMount(TextSearch);

    it("renders a Vue instance", () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });
});
