import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Title,
  Container,
  Content,
  Body,
  Button,
  Text,
  Icon,
  Right,
  Left,
  Form,
  ListItem,
  Item,
  Label,
  Input,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import DocumentActions from "../redux/actions/DocumentActions";

// END IMPORT ACTIONS

/** APIs

* actionsUser.create
*	@description CRUD ACTION create
*
* actionsUser.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsUser.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsDocument.findBy_users
*	@description CRUD ACTION findBy_users
*	@param Objectid key - Id of model to search for
*

**/


class UserEdit extends Component {
  
  // Init user
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authorized: false
    };
  }

  // Load data on start
  componentWillMount() {

    this.props.navigation.addListener("willFocus", async () => { 
      // Check security
      if (await SecurityService.isAuth([  ])) {
        this.setState({ authorized: true });
      } else {
        this.props.navigation.navigate("Login", {
          showError: "Not authorized"
        });
        return;
      }


      // Load data
      const itemId = this.props.navigation.getParam("id", "new");
      if (itemId !== "new") {
        this.props.actionsUser.loadUser(itemId);
        this.props.actionsDocument.findBy_users(itemId);
      } else {
        this.setState({
          user: {}
        });
      }
      
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      user: {}
    });
    this.props.actionsUser.reset();
  }

  // Insert props user in state
  componentWillReceiveProps(props) {
    this.setState({
      user: props.user
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.user.password || this.state.user.password.trim() === "") {
      errors.password = true;
    }
    
    if (!this.state.user.username || this.state.user.username.trim() === "") {
      errors.username = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.user._id) {
      // Edit
      this.props.actionsUser.saveUser(this.state.user).then(data => {
        this.props.navigation.navigate("UserList");
      });
    } else {
      // Create
      this.props.actionsUser.createUser(this.state.user).then(data => {
        this.props.navigation.navigate("UserList");
      });
    }
  }

  // Show content
  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detail User</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            
            <Item floatingLabel>
              <Label>
                Mail
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { mail: value }))
                }
                value={this.state.user.mail && this.state.user.mail.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Name
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { name: value }))
                }
                value={this.state.user.name && this.state.user.name.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.password === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.password === true ? { style: styles.validatorLabel } : {})}>
                Password *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { password: value }))
                }
                value={this.state.user.password && this.state.user.password.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.password === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Roles
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { roles: value }))
                }
                value={this.state.user.roles && this.state.user.roles.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Surname
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { surname: value }))
                }
                value={this.state.user.surname && this.state.user.surname.toString()}
              />
            </Item>
          
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.username === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.username === true ? { style: styles.validatorLabel } : {})}>
                Username *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.user, { username: value }))
                }
                value={this.state.user.username && this.state.user.username.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.username === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          

          {/* RELATIONS */}
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Document */}

          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsDocument: bindActionCreators(DocumentActions, dispatch),
  };
};

// Validate types
UserEdit.propTypes = { 
  actionsDocument: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    user: state.UserEditReducer.user,
    listDocument: state.UserEditReducer.listDocument
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
