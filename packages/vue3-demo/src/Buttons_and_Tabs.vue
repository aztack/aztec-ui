<template>
  <AzSection caption="Buttons & Tabs">
    <AzButton className="small right" type="plain" size="extra-small" slot="after" @click="onClick">Collapse</AzButton>
    <AzTabs items="[{caption:'Disabled Buttons'}, {caption: 'Normal', icon: 'check'}, {caption: 'Empty Tab', icon: 'bars'}, {icon: 'download', closable: true}]" active-index="1">
      <AzPanel>
        <AzButton className="small" icon="close" caption="Cancel" icon-position="left" :disabled="true"></AzButton>
    </AzPanel>
      <AzPanel id="buttons" direction="horizontal">
        <AzButton :style="marginRight" type="plain" size="extra-small" caption="Extra Small"></AzButton>
        <AzButton :style="marginRight" type="primary" size="small" caption="Small" icon="book"></AzButton>
        <AzButton :style="marginRight" type="success" size="normal" caption="Normal" icon="loading" id="loadingBtn"></AzButton>
        <AzButton :style="marginRight" type="warning" size="medium" caption="Medium" icon="download" id="downloadBtn" icon-position="right"></AzButton>
        <AzButton :style="marginRight" type="danger" size="large" caption="Large" icon="close"></AzButton>
        <AzButton :style="marginRight" type="info" size="extra-large" caption="Extra Large" icon="cog"></AzButton>
        <br/>
        <br/>
        <az-checkbox caption="Disable all buttons" id="disableAllButtons"></az-checkbox>
      </AzPanel>
      <AzPanel>
        This is a empty panel
      </AzPanel>
      <AzPanel>
        Tab with only icon
      </AzPanel>
    </AzTabs>
  </AzSection>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AzSection, AzButton, AzPanel} from 'aztec-ui-vue'

export default defineComponent({
  components: {
    AzSection,
    AzPanel,
    AzButton
  }
})
</script>
