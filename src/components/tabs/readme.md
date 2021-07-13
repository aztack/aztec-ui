# az-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type              | Default |
| ------------- | -------------- | ----------- | ----------------- | ------- |
| `activeIndex` | `active-index` |             | `number`          | `0`     |
| `indicator`   | `indicator`    |             | `boolean`         | `true`  |
| `items`       | --             |             | `TabItemConfig[]` | `[]`    |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `closed` |             | `CustomEvent<any>` |


## Methods

### `addItem(it: TabItemConfig | string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeItem(caption: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeItemAt(index: number) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [az-icon](../icons)

### Graph
```mermaid
graph TD;
  az-tabs --> az-icon
  style az-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
