import { attachProps, isCoveredByReact } from './../utils/attachProps';
import { createForwardRef, mergeRefs } from './../utils/index';
import React from 'react';
import {camelToDashCase, dashToPascalCase} from '../utils/strings';

interface AzReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
  forwardedRef?: React.ForwardedRef<ElementType>;
  ref?: React.Ref<any>;
}

export const createReactComponent = <PropType, ElementType>(tagName: string) => {
  const displayName = dashToPascalCase(tagName);

  const ReactComponent = class extends React.Component<AzReactInternalProps<PropType>> {
    static displayName = displayName;
    ref: React.RefObject<HTMLElement>;
    stableMergedRefs: React.RefCallback<HTMLElement>;

    constructor(props: AzReactInternalProps<PropType>) {
      super(props);
      this.ref = React.createRef();
      this.stableMergedRefs = mergeRefs(this.ref, this.props.forwardedRef)
    }

    componentDidMount() {
      this.componentDidUpdate(this.props)
    }

    componentDidUpdate(prevProps: AzReactInternalProps<PropType>) {
      const node = this.ref.current! as HTMLElement;
      attachProps(node, this.props, prevProps);
    }

    render() {
      const { children, forwardedRef, style, className, ref, ...cProps} = this.props;

      const propsToPass = Object.keys(cProps).reduce((acc, name) => {
        if (name.indexOf('on') === 0 && name[2] ===name[2].toUpperCase()) {
          // event handlers
          const eventName = name.substring(2).toLowerCase();
          if (isCoveredByReact(eventName)) {
            (acc as any)[name] = (cProps as any)[name];
          }
        } else if (['string', 'boolean', 'number'].includes(typeof (cProps as any)[name])) {
          (acc as any)[camelToDashCase(name)] = (cProps as any)[name];
        } else if (name === 'items') {
          (acc as any).items = JSON.stringify(cProps[name]);
        }
        return acc;
      }, {});

      const newProps: AzReactInternalProps<PropType> = {
        ...propsToPass,
        ref: this.stableMergedRefs,
        style,
      };

      return React.createElement(tagName, newProps, children);
    }
  }

  return createForwardRef<PropType, ElementType>(ReactComponent, displayName);
}
