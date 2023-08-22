<template>
  <AzPanel caption="Demo" id="demo" style="max-width: 800px">
    <Buttons_and_Tabs />
    <Selects />
    <Checkbox_Switch_Radio />
    <Inputs />
    <Icons />
    <Trees />
    <Toolbars />
    <Sliders />
    <ColorPickers />
    <Dialogs />
    <Tooltips />
    <ProgressBars />
    <Splitters />
    <Notifications />
    <Forms />

    <AzSection caption="Checkbox & Switch & Radio" arrow-position="right">
      <AzCheckbox slot="after" class="right">Checkbox</AzCheckbox>
      <AzCheckbox checked="true">Beijing</AzCheckbox>&nbsp;
      <AzCheckbox>Shanghai</AzCheckbox>
      <br/>
      <br/>
      <AzSwitch caption="Plain" type="plain" value="true" style="margin-right: 1em;"></AzSwitch>
      <AzSwitch caption="Success" type="success" value="true" style="margin-right: 1em;"></AzSwitch>
      <AzSwitch caption="Warning" type="warning" value="true" style="margin-right: 1em;"></AzSwitch>
      <AzSwitch caption="Danger" type="danger" value="true" style="margin-right: 1em;"></AzSwitch>
      <AzSwitch caption="Info" type="info" value="true" style="margin-right: 1em;"></AzSwitch>
      <br/>
      <br/>
      <AzGroup limit="3">
        <AzRadio caption="plain" checked="true" type="plain"></AzRadio>
        <AzRadio caption="success" checked="true" type="success"></AzRadio>
        <AzRadio caption="warning" checked="true" type="warning"></AzRadio>
        <AzRadio caption="danger" checked="true" type="danger"></AzRadio>
        <AzRadio caption="info" checked="true" type="info"></AzRadio>
      </AzGroup>
    </AzSection>

    <AzSection caption="Input" arrow-position="right">
      <AzInput type="text" caption="Text" value="with caption" autocomplete="off"></AzInput>
      <AzInput type="text" caption="Placeholder" placeholder="placeholder" autocomplete="off"></AzInput>
      <AzInput type="text" caption="Clearable" placeholder="placeholder" value="clearable" clearable="true" autocomplete="off"></AzInput>
      <br/>
      <br/>
      <AzInput type="number" caption="Number" constrain min="0" max="500" placeholder="placeholder" value="1" clearable="true" autocomplete="off"></AzInput>
      <br/>
      <br/>
      <AzInput type="color-picker" placeholder="placeholder" value="red" clearable="true" autocomplete="off"></AzInput>
    </AzSection>
    <Icons />
  </AzPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icons from './Icons.vue';
import Buttons_and_Tabs from './Buttons_and_Tabs.vue';
import Selects from './Selects.vue';

import 'aztec-ui/dist/aztec-ui/aztec-ui.css'
import {
  AzTabs,
  AzPanel,
  AzRadio,
  AzGroup,
  AzInput,
  AzButton,
  AzSelect,
  AzSwitch,
  AzSection,
  AzCheckbox,
} from 'aztec-ui-vue'

const App = defineComponent({
  data() {
    return {
      marginRight: {
        marginRight: '1em'
      }
    };
  },
  components: {
    Icons,
    Buttons_and_Tabs,
    Selects,
    AzTabs,
    AzRadio,
    AzPanel,
    AzInput,
    AzGroup,
    AzSwitch,
    AzSelect,
    AzButton,
    AzSection,
    AzCheckbox,
  },
  mounted() {
    const loadingBtn = document.querySelector<HTMLAzButtonElement>('#loadingBtn')!;
    const downloadBtn = document.querySelector<HTMLAzButtonElement>('#downloadBtn')!;
    setTimeout(() => {
      downloadBtn.circle = true;
      downloadBtn.caption = '';
      loadingBtn.icon = 'check';
      loadingBtn.round = true;
    }, 3000);
  },
  methods: {
    onClick() {
      alert(1);
    }
  }
});
App.displayName = 'AztecUIVue3Demo';

export default App;
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
