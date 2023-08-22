import { defineComponent, getCurrentInstance, h, inject, ref } from 'vue';
const UPDATE_VALUE_EVENT = 'update:modelValue';
const MODEL_VALUE = 'modelValue';
const ROUTER_LINK_VALUE = 'routerLink';
const NAV_MANAGER = 'navManager';
const ROUTER_PROP_REFIX = 'router';
const getComponentClasses = (classes) => {
    var _a;
    return ((_a = classes) === null || _a === void 0 ? void 0 : _a.split(' ')) || [];
};
const getElementClasses = (ref, componentClasses, defaultClasses = []) => {
    var _a;
    return [...Array.from(((_a = ref.value) === null || _a === void 0 ? void 0 : _a.classList) || []), ...defaultClasses]
        .filter((c, i, self) => !componentClasses.has(c) && self.indexOf(c) === i);
};
/**
* Create a callback to define a Vue component wrapper around a Web Component.
*
* @prop name - The component tag name (i.e. `ion-button`)
* @prop componentProps - An array of properties on the
* component. These usually match up with the @Prop definitions
* in each component's TSX file.
* @prop componentOptions - An object that defines additional
* options for the component such as router or v-model
* integrations.
*/
export const defineContainer = (name, componentProps = [], componentOptions = {}) => {
    const { modelProp, modelUpdateEvent, externalModelUpdateEvent } = componentOptions;
    /**
    * Create a Vue component wrapper around a Web Component.
    * Note: The `props` here are not all properties on a component.
    * They refer to whatever properties are set on an instance of a component.
    */
    const Container = defineComponent((props, { attrs, slots, emit }) => {
        var _a;
        let modelPropValue = props[modelProp];
        const containerRef = ref();
        const classes = new Set(getComponentClasses(attrs.class));
        const onVnodeBeforeMount = (vnode) => {
            // Add a listener to tell Vue to update the v-model
            if (vnode.el) {
                const eventsNames = Array.isArray(modelUpdateEvent) ? modelUpdateEvent : [modelUpdateEvent];
                eventsNames.forEach((eventName) => {
                    vnode.el.addEventListener(eventName.toLowerCase(), (e) => {
                        modelPropValue = (e === null || e === void 0 ? void 0 : e.target)[modelProp];
                        emit(UPDATE_VALUE_EVENT, modelPropValue);
                        /**
                         * We need to emit the change event here
                         * rather than on the web component to ensure
                         * that any v-model bindings have been updated.
                         * Otherwise, the developer will listen on the
                         * native web component, but the v-model will
                         * not have been updated yet.
                         */
                        emit(externalModelUpdateEvent, e);
                    });
                });
            }
        };
        const currentInstance = getCurrentInstance();
        const hasRouter = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.appContext) === null || _a === void 0 ? void 0 : _a.provides[NAV_MANAGER];
        const navManager = hasRouter ? inject(NAV_MANAGER) : undefined;
        const handleRouterLink = (ev) => {
            const { routerLink } = props;
            if (!routerLink)
                return;
            const routerProps = Object.keys(props).filter(p => p.startsWith(ROUTER_PROP_REFIX));
            if (navManager !== undefined) {
                let navigationPayload = { event: ev };
                routerProps.forEach(prop => {
                    navigationPayload[prop] = props[prop];
                });
                navManager.navigate(navigationPayload);
            }
            else {
                console.warn('Tried to navigate, but no router was found. Make sure you have mounted Vue Router.');
            }
        };
        return () => {
            modelPropValue = props[modelProp];
            getComponentClasses(attrs.class).forEach(value => {
                classes.add(value);
            });
            const oldClick = props.onClick;
            const handleClick = (ev) => {
                if (oldClick !== undefined) {
                    oldClick(ev);
                }
                if (!ev.defaultPrevented) {
                    handleRouterLink(ev);
                }
            };
            let propsToAdd = Object.assign(Object.assign({}, convertPropNameToKebabStyle(props)), { ref: containerRef, class: getElementClasses(containerRef, classes), onClick: handleClick, onVnodeBeforeMount: (modelUpdateEvent && externalModelUpdateEvent) ? onVnodeBeforeMount : undefined });
            if (modelProp) {
                /**
                 * Starting in Vue 3.1.0, all properties are
                 * added as keys to the props object, even if
                 * they are not being used. In order to correctly
                 * account for both value props and v-model props,
                 * we need to check if the key exists for Vue <3.1.0
                 * and then check if it is not undefined for Vue >= 3.1.0.
                 */
                propsToAdd = Object.assign(Object.assign({}, propsToAdd), { [modelProp]: props.hasOwnProperty(MODEL_VALUE) && props[MODEL_VALUE] !== undefined ? props.modelValue : modelPropValue });
            }
            return h(name, propsToAdd, slots.default && slots.default());
        };
    });
    Container.displayName = name;
    Container.props = [...componentProps, ROUTER_LINK_VALUE];
    if (modelProp) {
        Container.props.push(MODEL_VALUE);
        Container.emits = [UPDATE_VALUE_EVENT, externalModelUpdateEvent];
    }
    return Container;
};
function convertPropNameToKebabStyle(props) {
    return Object.keys(props).reduce((ret, key) => {
        if (key.toLowerCase() === key) {
            ret[key] = props[key];
        }
        else {
            const kebabKey = key.replace(/([A-Z])/g, s => `-${s.toLowerCase()}`);
            ret[kebabKey] = props[key];
        }
        return ret;
    }, {});
}
//# sourceMappingURL=defineContainer.js.map