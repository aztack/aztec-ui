import { defineCustomElements } from "aztec-ui/dist/loader";
export const IonicVue = {
    async install(_) {
        if (typeof window !== 'undefined') {
            await defineCustomElements(window);
        }
    }
};
//# sourceMappingURL=register-wc.js.map