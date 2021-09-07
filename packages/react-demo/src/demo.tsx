
import {
  AzButton, AzCheckbox, AzHr, AzIcon, AzPanel, AzSection, AzSelect, AzTabs
} from 'aztec-ui-react';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const marginRight = {marginRight: '1em'};
  return <>
    <AzSection caption="Buttons & Tabs">
      <AzButton className="small right" type="plain" size="extra-small" slot="header" onClick={() => alert(1)}>Collapse</AzButton>
      <AzTabs items="[{caption:'Disabled Buttons'}, {caption: 'Normal', icon: 'check'}, {caption: 'Empty Tab', icon: 'bars'}, {icon: 'download', closable: true}]" active-index="1">
        <AzPanel>
          <AzButton className="small" icon="close" caption="Cancel" icon-position="left" disabled={true}></AzButton>
        </AzPanel>
        <AzPanel id="buttons" direction="horizontal">
          <AzButton style={marginRight} type="plain" size="extra-small" caption="Extra Small"></AzButton>
          <AzButton style={marginRight} type="primary" size="small" caption="Small" icon="book"></AzButton>
          <AzButton style={marginRight} type="success" size="normal" caption="Normal" icon="loading" id="loadingBtn"></AzButton>
          <AzButton style={marginRight} type="warning" size="medium" caption="Medium" icon="download" id="downloadBtn" icon-position="right"></AzButton>
          <AzButton style={marginRight} type="danger" size="large" caption="Large" icon="close"></AzButton>
          <AzButton style={marginRight} type="info" size="extra-large" caption="Extra Large" icon="cog"></AzButton>
          <br/>
          <br/>
          <AzCheckbox caption="Disable all buttons" id="disableAllButtons"></AzCheckbox>
        </AzPanel>
        <AzPanel>
          This is a empty panel
        </AzPanel>
        <AzPanel>
          Tab with only icon
        </AzPanel>
      </AzTabs>
    </AzSection>

    <AzSection caption="Select">
      <AzSelect>
        <option value="primary">Primary</option>
        <option value="success">Success</option>
      </AzSelect>
    </AzSection>

    <AzSection caption="Checkbox & Switch & Radio">
      <AzCheckbox class="right">Checkbox</AzCheckbox>
    </AzSection>

    <AzSection caption="Icons" class="icons">
    <AzIcon register icon="fort" style={{display:"none"}}>
      M365.714286 576l0-128q0-9.142857-9.142857-9.142857l-54.857143 0q-9.142857 0-9.142857 9.142857l0 128q0 9.142857 9.142857 9.142857l54.857143 0q9.142857 0 9.142857-9.142857zm292.571429 0l0-128q0-9.142857-9.142857-9.142857l-54.857143 0q-9.142857 0-9.142857 9.142857l0 128q0 9.142857 9.142857 9.142857l54.857143 0q9.142857 0 9.142857-9.142857zm292.571429 18.285714l0 429.714286-365.714286 0 0-182.857143q0-45.714286-32-77.714286t-77.714286-32-77.714286 32-32 77.714286l0 182.857143-365.714286 0 0-429.714286q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-356.571429q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l9.142857 0 0-224.571429q-18.285714-10.857143-18.285714-31.428571 0-14.857143 10.857143-25.714286t25.714286-10.857143 25.714286 10.857143 10.857143 25.714286q0 20.571429-18.285714 31.428571l0 5.142857 155.428571 0q9.142857 0 9.142857 9.142857l0 128q0 9.142857-9.142857 9.142857l-155.428571 0 0 73.142857 9.142857 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 356.571429 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857z
    </AzIcon>
    <AzIcon register icon="radio" style={{display:"none"}}>
      M853.333333 256C900.266667 256 938.666667 294.4 938.666667 341.333333L938.666667 853.333333C938.666667 900.266667 900.266667 938.666667 853.333333 938.666667L170.666667 938.666667C123.733333 938.666667 85.333333 900.266667 85.333333 853.333333L85.333333 341.333333C85.333333 305.066667 107.946667 273.92 139.946667 261.546667L670.293333 42.666667 702.72 120.746667 376.746667 256 853.333333 256M853.333333 341.333333 170.666667 341.333333 170.666667 512 682.666667 512 682.666667 426.666667 768 426.666667 768 512 853.333333 512 853.333333 341.333333M298.666667 597.333333C227.84 597.333333 170.666667 654.506667 170.666667 725.333333 170.666667 796.16 227.84 853.333333 298.666667 853.333333 369.493333 853.333333 426.666667 796.16 426.666667 725.333333 426.666667 654.506667 369.493333 597.333333 298.666667 597.333333Z
    </AzIcon>
    <AzIcon register icon="code" style={{display:"none"}} svg-attr="{'viewBox': '0 0 48 48'}">
      <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 13 4 25.432 16 37M32 13l12 12.432L32 37" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="m28 4-7 40" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path></svg>
    </AzIcon>
      <AzIcon icon="arrow-down" title="arrow-down" color="#e05f5f" hover-effect="border"></AzIcon>
      <AzIcon icon="arrow-left" title="arrow-left" hover-effect="border"></AzIcon>
      <AzIcon icon="arrow-right" title="arrow-right" hover-effect="border"></AzIcon>
      <AzIcon icon="arrow-up" title="arrow-up" hover-effect="border"></AzIcon>
      <AzIcon icon="backward" title="backward" hover-effect="border"></AzIcon>
      <AzIcon icon="bars" title="bars" hover-effect="border"></AzIcon>
      <AzIcon icon="book" title="book" hover-effect="border"></AzIcon>
      <AzIcon icon="check" title="check" hover-effect="border"></AzIcon>
      <AzIcon icon="circle-check" title="circle-check" hover-effect="border"></AzIcon>
      <AzIcon icon="circle-cross" title="circle-cross" hover-effect="border"></AzIcon>
      <AzIcon icon="circle-exclamation" title="circle-exclamation" hover-effect="border"></AzIcon>
      <AzIcon icon="close" title="close" hover-effect="border"></AzIcon>
      <AzIcon icon="cog" title="cog" hover-effect="border"></AzIcon>
      <AzIcon icon="cogs" title="cogs" hover-effect="border"></AzIcon>
      <AzIcon icon="copy" title="copy" hover-effect="border"></AzIcon>
      <AzIcon icon="debian" title="debian" hover-effect="border"></AzIcon>
      <AzIcon icon="dir-tree" title="dir-tree" hover-effect="border"></AzIcon>
      <AzIcon icon="download" title="download" hover-effect="border"></AzIcon>
      <AzIcon icon="drag" title="drag" hover-effect="border"></AzIcon>
      <AzIcon icon="edit" title="edit" hover-effect="border"></AzIcon>
      <AzIcon icon="ellipsis-h" title="ellipsis-h" hover-effect="border"></AzIcon>
      <AzIcon icon="ellipsis-v" title="ellipsis-v" hover-effect="border"></AzIcon>
      <AzIcon icon="empty-box" title="empty-box" hover-effect="border"></AzIcon>
      <AzIcon icon="exchange" title="exchange" hover-effect="border"></AzIcon>
      <AzIcon icon="exclamation" title="exclamation" hover-effect="border"></AzIcon>
      <AzIcon icon="eye" title="eye" hover-effect="border"></AzIcon>
      <AzIcon icon="eye-close" title="eye-close" hover-effect="border"></AzIcon>
      <AzIcon icon="fast-backward" title="fast-backward" hover-effect="border"></AzIcon>
      <AzIcon icon="fast-forward" title="fast-forward" hover-effect="border"></AzIcon>
      <AzIcon icon="fedora" title="fedora" hover-effect="border"></AzIcon>
      <AzIcon icon="file" title="file" hover-effect="border"></AzIcon>
      <AzIcon icon="floppy-disk" title="floppy-disk" hover-effect="border"></AzIcon>
      <AzIcon icon="folder" title="folder" hover-effect="border"></AzIcon>
      <AzIcon icon="forward" title="forward" hover-effect="border"></AzIcon>
      <AzIcon icon="heart" title="heart" hover-effect="border"></AzIcon>
      <AzIcon icon="linux" title="linux" hover-effect="border"></AzIcon>
      <AzIcon icon="list" title="list" hover-effect="border"></AzIcon>
      <AzIcon icon="loading" title="loading" hover-effect="border"></AzIcon>
      <AzIcon icon="logout" title="logout" hover-effect="border"></AzIcon>
      <AzIcon icon="mac" title="mac" hover-effect="border"></AzIcon>
      <AzIcon icon="minus" title="minus" hover-effect="border"></AzIcon>
      <AzIcon icon="mouse-pointer" title="mouse-pointer" hover-effect="border"></AzIcon>
      <AzIcon icon="move" title="move" hover-effect="border"></AzIcon>
      <AzIcon icon="move-node-down" title="move-node-down" hover-effect="border"></AzIcon>
      <AzIcon icon="move-node-up" title="move-node-up" hover-effect="border"></AzIcon>
      <AzIcon icon="nintendo-switch" title="nintendo-switch" hover-effect="border"></AzIcon>
      <AzIcon icon="open-folder" title="open-folder" hover-effect="border"></AzIcon>
      <AzIcon icon="paste" title="paste" hover-effect="border"></AzIcon>
      <AzIcon icon="pause" title="pause" hover-effect="border"></AzIcon>
      <AzIcon icon="plus" title="plus" hover-effect="border"></AzIcon>
      <AzIcon icon="question" title="question" hover-effect="border"></AzIcon>
      <AzIcon icon="redhat" title="redhat" hover-effect="border"></AzIcon>
      <AzIcon icon="redo" title="redo" hover-effect="border"></AzIcon>
      <AzIcon icon="refresh" title="refresh" hover-effect="border"></AzIcon>
      <AzIcon icon="search" title="search" hover-effect="border"></AzIcon>
      <AzIcon icon="share" title="share" hover-effect="border"></AzIcon>
      <AzIcon icon="share2" title="share2" hover-effect="border"></AzIcon>
      <AzIcon icon="shop-cart" title="shop-cart" hover-effect="border"></AzIcon>
      <AzIcon icon="square" title="square" hover-effect="border"></AzIcon>
      <AzIcon icon="suse-linux" title="suse-linux" hover-effect="border"></AzIcon>
      <AzIcon icon="three-dots" title="three-dots" hover-effect="border"></AzIcon>
      <AzIcon icon="trash" title="trash" hover-effect="border"></AzIcon>
      <AzIcon icon="triangle" title="triangle" hover-effect="border"></AzIcon>
      <AzIcon icon="ubuntu" title="ubuntu" hover-effect="border"></AzIcon>
      <AzIcon icon="undo" title="undo" hover-effect="border"></AzIcon>
      <AzIcon icon="windows" title="windows" hover-effect="border"></AzIcon>
      <AzIcon icon="zoom-in" title="zoom-in" hover-effect="border"></AzIcon>
      <AzIcon icon="zoom-out" title="zoom-out" hover-effect="border"></AzIcon>
      &nbsp;
      <AzIcon icon="radio" title="radio" wait={true} color="var(--az-danger-color)" hover-effect="background"></AzIcon>
      <AzIcon icon="fort" title="fort" wait={true} color="var(--az-info-color)" hover-effect="background"></AzIcon>
      <AzIcon icon="code" title="code" hover-effect="border"></AzIcon>

      <AzHr caption="Icon Composition" icon="check" caption-position="center" style={{"margin":"1em 0"}}></AzHr>
      <AzIcon caption="WSL" icon="heart" hover-effect="border background" style={{padding: "2px 0.5em"}} width="6" height="6">
        <AzIcon icon="windows" slot="before"></AzIcon>
        <AzIcon icon="ubuntu" slot="after"></AzIcon>
      </AzIcon>

      <AzHr caption="Downloads" caption-position="center" style={{"margin-bottom":"1em"}}>
        <AzIcon icon="exclamation" slot="after"></AzIcon>
      </AzHr>
        <AzButton caption="Windows" icon="windows" class="az-effect-background"></AzButton>
        <AzButton caption="Mac" icon="mac" class="az-effect-background"></AzButton>
        <AzButton caption="Linux" icon="linux" class="az-effect-background"></AzButton>
    </AzSection>
  </>
}

ReactDOM.render(<App/>, document.getElementById('app'));


