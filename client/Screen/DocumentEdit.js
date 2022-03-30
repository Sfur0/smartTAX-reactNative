import React, { Component } from "react";
import { StyleSheet } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
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
  DatePicker,
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

* actionsDocument.create
*	@description CRUD ACTION create
*
* actionsDocument.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsDocument.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*

**/


class DocumentEdit extends Component {
  
  // Init document
  constructor(props) {
    super(props);
    this.state = {
      document: {},
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
        this.props.actionsDocument.loadDocument(itemId);
      } else {
        this.setState({
          document: {}
        });
      }
      
      this.props.actionsUser.loadUserList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      document: {}
    });
    this.props.actionsDocument.reset();
  }

  // Insert props document in state
  componentWillReceiveProps(props) {
    this.setState({
      document: props.document
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.document.Name || this.state.document.Name.trim() === "") {
      errors.Name = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.document._id) {
      // Edit
      this.props.actionsDocument.saveDocument(this.state.document).then(data => {
        this.props.navigation.navigate("DocumentList");
      });
    } else {
      // Create
      this.props.actionsDocument.createDocument(this.state.document).then(data => {
        this.props.navigation.navigate("DocumentList");
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
            <Title>Detail Document</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>
                Date
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.document.Date }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.document, { Date: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.Name === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.Name === true ? { style: styles.validatorLabel } : {})}>
                Name *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.document, { Name: value }))
                }
                value={this.state.document.Name && this.state.document.Name.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.Name === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Size
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.document, { Size: value }))
                }
                value={this.state.document.Size && this.state.document.Size.toString()}
              />
            </Item>
          
            
            <Item floatingLabel>
              <Label>
                Type
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.document, { Type: value }))
                }
                value={this.state.document.Type && this.state.document.Type.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* Relation m:m _users with User */}
          
          <Item stackedLabel>              
            <Label >
              _users
            </Label>
            <SectionedMultiSelect
              items={this.props.listUser }
              displayKey="_id"
              uniqueKey="_id"
              selectText="Choose some items..."
              alwaysShowSelectText={true}
              modalAnimationType={"slide"}
              renderSelectText={() => {
                return "Choose some items...";
              }}
              onSelectedItemsChange={value =>
                this.setState(Object.assign(this.state.document, { _users: value }))
              }
              selectedItems={this.state.document._users }
            />
          </Item>
          
          

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
DocumentEdit.propTypes = { 
  actionsDocument: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    document: state.DocumentEditReducer.document,
    listUser: state.DocumentEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
