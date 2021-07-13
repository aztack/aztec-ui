# az-color-picker



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type      | Default                           |
| ----------- | ----------- | ----------- | --------- | --------------------------------- |
| `caption`   | `caption`   |             | `string`  | `''`                              |
| `color`     | `color`     |             | `string`  | `AzColorPicker.defaultColor`      |
| `colorfmt`  | `colorfmt`  |             | `string`  | `ColorFormat[this.colorfmtIndex]` |
| `readonly`  | `readonly`  |             | `boolean` | `false`                           |
| `showinput` | `showinput` |             | `boolean` | `true`                            |


## Events

| Event     | Description | Type               |
| --------- | ----------- | ------------------ |
| `changed` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [az-input](../input)

### Depends on

- [az-slider](../slider)
- [az-input](../input)

### Graph
```mermaid
graph TD;
  az-color-picker --> az-slider
  az-color-picker --> az-input
  az-input --> az-color-picker
  style az-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
