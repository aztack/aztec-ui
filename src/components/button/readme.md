# az-button



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                           | Default     |
| -------------- | --------------- | ----------- | ------------------------------------------------------------------------------ | ----------- |
| `caption`      | `caption`       |             | `string`                                                                       | `''`        |
| `circle`       | `circle`        |             | `boolean`                                                                      | `false`     |
| `disabled`     | `disabled`      |             | `boolean`                                                                      | `false`     |
| `icon`         | `icon`          |             | `string`                                                                       | `''`        |
| `iconPosition` | `icon-position` |             | `"center" \| "left" \| "right"`                                                | `'left'`    |
| `round`        | `round`         |             | `boolean`                                                                      | `false`     |
| `size`         | `size`          |             | `"extra-large" \| "extra-small" \| "large" \| "medium" \| "normal" \| "small"` | `'normal'`  |
| `type`         | `type`          | Button type | `"danger" \| "info" \| "plain" \| "primary" \| "success" \| "warning"`         | `'primary'` |


## Dependencies

### Used by

 - [az-dialog](../dialog)
 - [az-notification](../notification)

### Depends on

- [az-icon](../icons)

### Graph
```mermaid
graph TD;
  az-button --> az-icon
  az-dialog --> az-button
  az-notification --> az-button
  style az-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
