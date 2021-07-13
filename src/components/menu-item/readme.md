# az-menu-item



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                                                   | Default   |
| ----------- | ------------ | ----------- | ---------------------------------------------------------------------- | --------- |
| `action`    | `action`     |             | `string`                                                               | `''`      |
| `caption`   | `caption`    |             | `string`                                                               | `''`      |
| `extraIcon` | `extra-icon` |             | `string`                                                               | `''`      |
| `extraText` | `extra-text` |             | `string`                                                               | `''`      |
| `icon`      | `icon`       |             | `string`                                                               | `''`      |
| `type`      | `type`       |             | `"danger" \| "info" \| "plain" \| "primary" \| "success" \| "warning"` | `'plain'` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `selected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [az-contextual-menu](../contextual-menu)

### Depends on

- [az-icon](../icons)

### Graph
```mermaid
graph TD;
  az-menu-item --> az-icon
  az-contextual-menu --> az-menu-item
  style az-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
