
import AppEvent from "../../common/AppEvent"

export default class {

  vueApp
  ipcRenderer

  constructor(ipcRenderer, vueApp) {
    this.vueApp = vueApp
    this.ipcRenderer = ipcRenderer
  }

  registerCallbacks() {
    this.ipcRenderer.on(AppEvent.settingsChanged, this.settingsChanged.bind(this))
    this.ipcRenderer.on(AppEvent.menuStyleChanged, this.menuStyle.bind(this))
    this.forward(AppEvent.closeTab)
    this.forward(AppEvent.newTab)
  }

  forward(event) {
    const emit = () => {
      console.log("forwarding", event)
      this.vueApp.$emit(event)
    }
    this.ipcRenderer.on(event, emit.bind(this))
  }

  closeTab() {
    this.vueApp.$emit(AppEvent.closeTab)
  }

  settingsChanged() {
    this.vueApp.$store.dispatch("settings/initializeSettings")
  }

  menuStyle() {
    this.vueApp.$noty.success("Restart Beekeeper for the change to take effect")
  }





}