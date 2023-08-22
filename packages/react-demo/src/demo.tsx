
import {
  AzButton, AzCheckbox, AzColorPicker, AzContextualMenu, AzDialog, AzForm, AzHr, AzIcon, AzInput,
  AzMenuItem, AzNotification, AzPanel, AzProgressBar, AzSection, AzSelect, AzSlider, AzSplitter,
  AzSwitch, AzTabs, AzToolbar, AzTooltip, AzTree, AzGroup, AzRadio
} from 'aztec-ui-react';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <>
    <ButtonsAndTabs />;
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
  </>
}

const Center: React.FC = (props) => {
  const s = {textAlign: 'center' } as const;
  return <span style={s}>{props.children}</span>;
}

const onClickShowNotificationButton = (placement: string) => {
  const type = ['success', 'info', 'warning', 'danger'][Math.floor(Math.random() * 4)];
  aztec.Notification[type](placement, 'Message', placement, 3000);
}
const marginRight = {marginRight: '1em'};
const ButtonsAndTabs: React.FC = () => {
  return <AzSection caption="Buttons & Tabs">
    <AzButton class="small right" type="plain" size="extra-small" slot="header" onClick={() => alert(1)}>Collapse</AzButton>
    <AzTabs items="[{caption:'Disabled Buttons'}, {caption: 'Normal', icon: 'check'}, {caption: 'Empty Tab', icon: 'bars'}, {icon: 'download', closable: true}]" active-index="1">
      <AzPanel>
        <AzButton class="small" icon="close" caption="Cancel" icon-position="left" disabled={true}></AzButton>
      </AzPanel>
      <AzPanel id="buttons" direction="horizontal">
        <AzButton style={marginRight} type="plain" size="extra-small" caption="Extra Small"></AzButton>
        <AzButton style={marginRight} type="primary" size="small" caption="Small" icon="book"></AzButton>
        <AzButton style={marginRight} type="success" size="normal" caption="Normal" icon="loading" id="loadingBtn"></AzButton>
        <AzButton style={marginRight} type="warning" size="medium" caption="Medium" icon="download" id="downloadBtn" icon-position="right" circle></AzButton>
        <AzButton style={marginRight} type="danger" size="large" caption="Large" icon="close"></AzButton>
        <AzButton style={marginRight} type="info" size="extra-large" caption="Extra Large" icon="cog"></AzButton>
        <br/>
        <br/>
        <AzCheckbox caption="Disable all buttons" id="disableAllButtons"></AzCheckbox>
      </AzPanel>
      <AzPanel> This is a empty panel </AzPanel>
      <AzPanel> Tab with only icon </AzPanel>
    </AzTabs>
  </AzSection>
}
const Inputs: React.FC = () => {
  return <AzSection caption="Input" arrow-position="right">
    <AzInput type="text" caption="Text" value="with caption" autocomplete="off" />
    <AzInput type="text" caption="Placeholder" placeholder="placeholder" autocomplete="off" />
    <AzInput type="text" caption="Clearable" placeholder="placeholder" value="clearable" clearable={true} autocomplete="off" />
    <br /> <br />
    <AzInput type="number" caption="Number" constrain min={0} max={500} placeholder="placeholder" value="1" clearable={true} autocomplete="off" />
    <br /> <br />
    <AzInput type="color-picker" placeholder="placeholder" value="red" clearable={true} autocomplete="off" />
  </AzSection>
}

const Selects: React.FC = () => {
  return <AzSection caption="Select">
    <AzSelect>
      <option value="primary">Primary</option>
      <option value="success">Success</option>
    </AzSelect>
  </AzSection>
}

const CheckboxSwitchRadio: React.FC = () => {
  return <AzSection caption="Checkbox & Switch & Radio" arrow-position="right">
    <AzCheckbox slot="after" class="right">Checkbox</AzCheckbox>
    <AzCheckbox checked={true}>Beijing</AzCheckbox>
    <AzCheckbox>Shanghai</AzCheckbox>
    <br />
    <br />
    <AzSwitch caption="Plain" type="plain" value={true} style={{marginRight: '1em'}} />
    <AzSwitch caption="Success" type="success" value={true} style={{marginRight: '1em'}} />
    <AzSwitch caption="Warning" type="warning" value={true} style={{marginRight: '1em'}} />
    <AzSwitch caption="Danger" type="danger" value={true} style={{marginRight: '1em'}} />
    <AzSwitch caption="Info" type="info" value={true} style={{marginRight: '1em'}} />
    <br />
    <br />
    <AzGroup limit={3}>
      <AzRadio caption="plain" checked={true} type="plain" />
      <AzRadio caption="success" checked={true} type="success" />
      <AzRadio caption="warning" checked={true} type="warning" />
      <AzRadio caption="danger" checked={true} type="danger" />
      <AzRadio caption="info" checked={true} type="info" />
    </AzGroup>
  </AzSection>
}

const Icons: React.FC = () => {
  return <AzSection caption="Icons" class="icons">
    <AzIcon register icon="fort" style={{display:"none"}}>
      M365.714286 576l0-128q0-9.142857-9.142857-9.142857l-54.857143 0q-9.142857 0-9.142857 9.142857l0 128q0 9.142857 9.142857 9.142857l54.857143 0q9.142857 0 9.142857-9.142857zm292.571429 0l0-128q0-9.142857-9.142857-9.142857l-54.857143 0q-9.142857 0-9.142857 9.142857l0 128q0 9.142857 9.142857 9.142857l54.857143 0q9.142857 0 9.142857-9.142857zm292.571429 18.285714l0 429.714286-365.714286 0 0-182.857143q0-45.714286-32-77.714286t-77.714286-32-77.714286 32-32 77.714286l0 182.857143-365.714286 0 0-429.714286q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-356.571429q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l9.142857 0 0-224.571429q-18.285714-10.857143-18.285714-31.428571 0-14.857143 10.857143-25.714286t25.714286-10.857143 25.714286 10.857143 10.857143 25.714286q0 20.571429-18.285714 31.428571l0 5.142857 155.428571 0q9.142857 0 9.142857 9.142857l0 128q0 9.142857-9.142857 9.142857l-155.428571 0 0 73.142857 9.142857 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 64 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857l0 356.571429 73.142857 0 0-64q0-9.142857 9.142857-9.142857l54.857143 0q9.142857 0 9.142857 9.142857z
    </AzIcon>
    <AzIcon register icon="radio" style={{display:"none"}}>
      M853.333333 256C900.266667 256 938.666667 294.4 938.666667 341.333333L938.666667 853.333333C938.666667 900.266667 900.266667 938.666667 853.333333 938.666667L170.666667 938.666667C123.733333 938.666667 85.333333 900.266667 85.333333 853.333333L85.333333 341.333333C85.333333 305.066667 107.946667 273.92 139.946667 261.546667L670.293333 42.666667 702.72 120.746667 376.746667 256 853.333333 256M853.333333 341.333333 170.666667 341.333333 170.666667 512 682.666667 512 682.666667 426.666667 768 426.666667 768 512 853.333333 512 853.333333 341.333333M298.666667 597.333333C227.84 597.333333 170.666667 654.506667 170.666667 725.333333 170.666667 796.16 227.84 853.333333 298.666667 853.333333 369.493333 853.333333 426.666667 796.16 426.666667 725.333333 426.666667 654.506667 369.493333 597.333333 298.666667 597.333333Z
    </AzIcon>
    <AzIcon register icon="code" style={{display:"none"}} svg-attr="{'viewBox': '0 0 48 48'}">
      <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 13 4 25.432 16 37M32 13l12 12.432L32 37" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="m28 4-7 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
      </svg>
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

    <AzHr caption="Downloads" caption-position="center" style={{marginBottom:"1em"}}>
      <AzIcon icon="exclamation" slot="after"></AzIcon>
    </AzHr>
      <AzButton caption="Windows" icon="windows" class="az-effect-background"></AzButton>
      <AzButton caption="Mac" icon="mac" class="az-effect-background"></AzButton>
      <AzButton caption="Linux" icon="linux" class="az-effect-background"></AzButton>
  </AzSection>
}

const Trees: React.FC = () => {
  return <AzSection caption="Tree" icon-position="right" icon="dir-tree" collapsable={true}>
    <AzTree id="tree1" caption="Tree Demo" selecting={true} item-draggable={true}>
      <AzCheckbox slot="after" caption="Editable" checked={true} />
      <AzContextualMenu id="tree1ContextMenu">
        <AzMenuItem caption="Add" action="add" icon="plus" />
        <AzMenuItem caption="-" />
        <AzMenuItem caption="Delete" action="delete" icon="close" extra-text="⌫" />
        <AzMenuItem caption="Save" action="save" icon="floppy-disk" extra-text="⌘S" />
        <AzMenuItem caption="Export" action="export" icon="download" />
      </AzContextualMenu>
    </AzTree>
    <br />
    <AzInput id="newItemCaption" caption="New item" value="五边形" />
    <AzButton id="addNewItem" caption="Add" />
    <AzButton id="setItemCaption" caption="Set" />
    <AzHr />
    <AzTree id="tree2" caption="Files" icon="open-folder" icon-position="left" />
  </AzSection>
}

const Toolbars: React.FC = () => {
  return <AzSection caption="Toolbar">
    <AzToolbar>
      <AzCheckbox caption="Checkbox" />
      <AzButton caption="Play" type="success" icon="triangle" />
      <AzButton caption="Stop" type="danger" icon="square" />
      <AzButton caption="Forward" type="warning" icon="forward" />
      <AzButton caption="Backward" type="info" icon="backward" />
      {/* <AzToolbarSeparator /> */}
      <AzButton caption="" type="plain" icon="three-dots">
        <AzContextualMenu triggerevent="mouseenter" popupalign="to-right">
          <AzMenuItem caption="Open" action="open" icon="open-folder" />
          <AzMenuItem caption="-" />
          <AzMenuItem caption="Save" action="save" icon="floppy-disk" />
          <AzMenuItem caption="Export to Somewhere on the Internet" action="export" icon="download" >
            <az-icon slot="extra" icon="triangle" />
            <AzContextualMenu triggerevent="mouseenter" closeevent="mouseleave" popupalign="to-right" >
              <AzMenuItem caption="Copy title" action="title" />
              <AzMenuItem caption="Abc" action="abc" />
            </AzContextualMenu>
          </AzMenuItem>
          <AzMenuItem icon="arrow-up" caption="hover ↑ see full caption" extra-text />
          <AzMenuItem caption="Delete" icon="close" type="danger" action="delete" />
          <AzMenuItem caption="More" type="info" action="more" icon="three-dots" extra-icon="triangle" >
            <AzContextualMenu triggerevent="mouseenter" closeevent="mouseleave" popupalign="to-right" >
              <AzMenuItem caption="Copy title" action="title" />
              <AzMenuItem caption="Abc" action="abc" />
            </AzContextualMenu>
          </AzMenuItem>
        </AzContextualMenu>
      </AzButton>
    </AzToolbar>
  </AzSection>
}

const Sliders: React.FC = () => {
  return <AzSection caption="Slider">
    <AzSlider caption="Default" min={0} max={1000} />
    <AzSlider caption="Triangle" min={0} max={100} class="triangle" />
    <AzSlider caption="Round" min={0} max={100} class="round" />
  </AzSection>
}

const ColorPickers: React.FC = () => {
  return <AzSection caption="Color Picker">
    <AzColorPicker />
  </AzSection>
}

const Dialogs: React.FC = () => {
  return <AzSection caption="Dialog">
    <AzDialog id="dialog1" caption="Modal Dialog" closable={false}>
      <Center>
        <h2 style={{ padding: "0 1em" }}>Dialog Content</h2>
      </Center>
      <AzButton slot="footer" caption="OK" onClick={() => window['dialog1'].hide()} />
    </AzDialog>
    <AzDialog id="dialog2" caption="No-modal Dialog" modal={false} closable={false} >
      <Center>
        <h2 style={{ padding: "0 1em" }}>Dialog Content</h2>
      </Center>
      <AzButton slot="footer" caption="OK" onClick={() => window['dialog2'].hide()} />
    </AzDialog>
    <AzButton id="openDialog" onClick={() => window['dialog1'].show()}>
      Open Modal Dialog
    </AzButton>
    <AzButton id="openDialog" onClick={() => window['dialog2'].show()}>
      Open Non-modal Dialog
    </AzButton>
    <AzButton id="createDialog">Create A Modal Masked Dialog</AzButton>
  </AzSection>
}

const Tooltips: React.FC = () => {
  return <AzSection caption="Tooltip">
    <div style={{ margin: "6em 10em" }}>
      <AzButton caption="show='true'">
        <AzTooltip placement="left" is-show={true} caption="show='true'" />
      </AzButton>
      <AzButton caption="trigger='hover' delay='1000'">
        <AzTooltip placement="top" is-show={true} caption="trigger='hover' delay='1000'" trigger="hover" delay={1000} />
      </AzButton>
      <AzButton caption="trigger='click'">
        <AzTooltip placement="bottom" is-show={true} caption="trigger='click'" trigger="click" />
      </AzButton>
      <AzButton caption="trigger='manual'">
        <AzTooltip placement="right" is-show={true} caption="trigger='manual'" trigger="manual" />
      </AzButton>
    </div>
  </AzSection>
}

const ProgressBars: React.FC = () => {
  return <AzSection caption="Progress Bar">
    <AzProgressBar id="progressbar1" caption="Volume" min={90} max={200} value={100} />
    <AzIcon class="AzButton" icon="minus" onClick={() => window['progressbar1'].value-=10} />
    <AzIcon icon="plus" onClick={() => window['progressbar1'].value+=10} />
  </AzSection>
}

const Splitters: React.FC = () => {
  return <AzSection caption="Splitter">
    <AzSplitter direction="vertical" style={{ height: 300 }}>
      <AzPanel basis="20%" min-height="50px" style={{ backgroundColor: "var(--az-success-color)" }} >
        Panel1
      </AzPanel>
      <AzPanel basis="60%" style={{ backgroundColor: "var(--az-warning-color)" }} >
        Panel2
        <h1 style={{ float: "right" }}>Double click here</h1>
        <h1>Right click here</h1>
        <AzContextualMenu id="ctxmenu1">
          <AzMenuItem caption="Open" action="open" icon="open-folder" />
          <AzMenuItem caption="-" />
          <AzMenuItem caption="Save" action="save" icon="floppy-disk" />
          <AzMenuItem caption="Export" action="export" icon="download" />
        </AzContextualMenu>
        <AzContextualMenu id="ctxmenu2" triggerevent="dblclick">
          <AzMenuItem caption="打开" action="open" icon="open-folder" />
          <AzMenuItem caption="-" />
          <AzMenuItem caption="保存" action="save" icon="floppy-disk" />
          <AzMenuItem caption="导出" action="export" icon="download" />
        </AzContextualMenu>
      </AzPanel>
      <AzPanel basis="20%" min-height="50px" style={{ backgroundColor: "var(--az-danger-color)" }} >
        Panel3
      </AzPanel>
    </AzSplitter>
    <br />
    <AzSplitter direction="horizontal" style={{ height: 50 }}>
      <AzPanel basis="20%" min-width="10%" style={{ backgroundColor: "var(--az-success-color)" }} >
        <Center>min-with:10%</Center>
      </AzPanel>
      <AzPanel basis="60%" style={{ backgroundColor: "var(--az-warning-color)" }} ></AzPanel>
      <AzPanel basis="20%" min-width="10%" style={{ backgroundColor: "var(--az-danger-color)" }} >
        min-width: 10%
      </AzPanel>
    </AzSplitter>
  </AzSection>
}

const Notifications: React.FC = () => {
  return <AzSection caption="Notification">
    <AzNotification caption="Success" type="success" timeout={Infinity}>
      <p> Hello <b>World!</b> </p>
    </AzNotification>
    <AzNotification caption="Info" type="info" timeout={Infinity} closable={false} >
      <p> Hello <b>World!</b> </p>
    </AzNotification>
    <AzNotification caption="Warning" type="warning" timeout={Infinity} closable={false} >
      <p> Hello <b>World!</b> </p>
    </AzNotification>
    <AzNotification caption="Error" type="danger" timeout={Infinity} closable={false} style={{ width: "50%", display: "block" }} >
      <p> Hello <b>World!</b> </p>
    </AzNotification>
    <br />
    <br />
    <AzButton caption="top-left" onClick={() => onClickShowNotificationButton('top-left')}/>
    <AzButton caption="top-right" onClick={() => onClickShowNotificationButton('top-right')}/>
    <AzButton caption="bottom-left" onClick={() => onClickShowNotificationButton('bottom-left')}/>
    <AzButton caption="bottom-right" onClick={() => onClickShowNotificationButton('bottom-right')}/>
    <AzButton caption="top-center" onClick={() => onClickShowNotificationButton('top-center')}/>
    <AzButton caption="right-center" onClick={() => onClickShowNotificationButton('right-center')}/>
    <AzButton caption="bottom-center" onClick={() => onClickShowNotificationButton('bottom-center')}/>
    <AzButton caption="left-center" onClick={() => onClickShowNotificationButton('left-center')}/>
    <AzButton caption="center" onClick={() => onClickShowNotificationButton('center')}/>
    <AzButton caption="toast" onClick={() => aztec.Notification.toast('Toast Message')} />
  </AzSection>
}

const Forms: React.FC = () => {
  return <AzSection caption="Form">
    <AzForm id="form1" caption="Form" onSubmit={() => false} style={{ width: 400 }} >
      <AzButton slot="footer" caption="Submit" />
    </AzForm>
  </AzSection>
}

ReactDOM.render(<App/>, document.getElementById('app'));
