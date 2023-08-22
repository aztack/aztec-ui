<template>
  <AzSection caption="Select">
    <AzSelect>
      <option value="primary">Primary</option>
      <option value="success">Success</option>
    </AzSelect>
  </AzSection>
</template>

<script>
import { defineComponent } from 'vue';
import { AzSection, AzSelect} from 'aztec-ui-vue'

export default defineComponent({
  components: {
    AzSection,
    AzSelect
  }
})
</script>
