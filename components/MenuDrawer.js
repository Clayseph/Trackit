import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './SideBar';
export default class DrawerExample extends Component {
  render() {
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()} >
      // Main View
      </Drawer>
    );
  }
}