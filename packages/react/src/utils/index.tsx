import React from 'react';


export type AzReactExternalProps<PropType, ElementType> = PropType &
  Omit<React.HTMLAttributes<ElementType>, 'style'> & {
    class?: string;
    className?: string;
    style?: Record<string, any>;
  }

export const createForwardRef = <PropType, ElementType>(
  ReactComponent: any,
  displayName: string
) => {
  const forwardRef = (
    props: AzReactExternalProps<PropType, ElementType>,
    ref: React.ForwardedRef<ElementType>
  ) => {
    return <ReactComponent {...props} forwardedRef={ref} />;
  };
  forwardRef.displayName = displayName;

  return React.forwardRef(forwardRef);
};

export const setRef = (ref: React.ForwardedRef<any> | React.Ref<any> | undefined, value: any) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref != null) {
    // Cast as a MutableRef so we can assign current
    (ref as React.MutableRefObject<any>).current = value
  }
};

export const mergeRefs = (
  ...refs: (React.ForwardedRef<any> | React.Ref<any> | undefined)[]
): React.RefCallback<any> => {
  return (value: any) => {
    refs.forEach(ref => {
      setRef(ref, value)
    })
  }
};
