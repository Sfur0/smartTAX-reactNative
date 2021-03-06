import React, { Component } from "react";
import { ListItem, List, Content, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import IconFA from "react-native-vector-icons/FontAwesome";
import SecurityService from "../security/SecurityService";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async logout() {
    await SecurityService.logout();
    this.props.navigation.navigate("Login", { showError: false });
  }

  render() {
    return (
      <Content style={styles.content}>
        <List>
          <ListItem onPress={() => this.props.navigation.navigate("Home")}>
            <IconMaterial name="home" size={20} style={styles.icons} />
            <Text>Home</Text>
          </ListItem>
          {/* START MY SCREENS */}
 
          <ListItem onPress={() => this.props.navigation.navigate("DocumentList")}>
            <IconMaterial
              name="keyboard-arrow-right"
              size={20}
              style={styles.icons}
            />
            <Text>List Document</Text>
          </ListItem>
          
          <ListItem onPress={() => this.props.navigation.navigate("UserList")}>
            <IconMaterial
              name="keyboard-arrow-right"
              size={20}
              style={styles.icons}
            />
            <Text>List User</Text>
          </ListItem>
          {/* END MY SCREENS */}

          <ListItem itemDivider />
          <ListItem onPress={() => this.props.navigation.navigate("Profile")}>
            <IconFA name="user" size={20} style={styles.icons} />
            <Text>Profile</Text>
          </ListItem>
          <ListItem onPress={() => this.logout()}>
            <IconMaterial
              name="power-settings-new"
              size={20}
              style={styles.icons}
            />
            <Text>Logout</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#ffffff",
    paddingTop: 50
  },
  icons: {
    marginRight: 20
  }
});
