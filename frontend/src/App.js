import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'whatwg-fetch';
import { Form, FormControl, FormGroup, MenuItem, DropdownButton, ButtonToolbar, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

const MIN_CHARACTERS_TO_SEARCH = 3;

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleElementClick = this.handleElementClick.bind(this);
  }

  handleElementClick() {
    let user_info = this.props.user_info;
    this.props.list.handleShowUserInfo(user_info, this.props.index);
  }

  render() {
    let user_info = this.props.user_info;
    let selected_idx = this.props.list.state.selected;
    let my_index = this.props.index;
    let is_selected = selected_idx == my_index;
    return(
      <ListGroupItem onClick={this.handleElementClick} active={is_selected}>
        {user_info.name}
      </ListGroupItem>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowUserInfo = this.handleShowUserInfo.bind(this);
    this.handleSelectUserChange = this.handleSelectUserChange.bind(this);
    this.state = {
      selected: -1,
      value: '',
      user_info: {},
      users_info: [],
    };
  }

  handleChange(e) {
    let self = this;
    let text_searched = e.target.value;
    this.setState({
      selected: -1,
      value: text_searched,
      user_info: {},
      users_info: []
    });
    text_searched = text_searched.trim();

    if(text_searched.length >= MIN_CHARACTERS_TO_SEARCH) {
      fetch('/api/UserInfos/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text_searched: text_searched,
        })
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        let users_info = data;
        self.setState({users_info: users_info});
      }).catch(function(error) {
        console.log('request failed', error);
      })
    }
  }

  handleShowUserInfo(user_info, selected_idx) {
    this.setState({ user_info: user_info, selected: selected_idx });
  }

  handleSelectUserChange(eventKey, event) {
    let users_info = this.state.users_info;
    let user_sel_idx = parseInt(eventKey, 10);

    if(isNaN(user_sel_idx)) {
      this.setState({
        selected: -1,
        user_info: {},
      });
    }else{
      this.setState({
        selected: user_sel_idx,
        user_info: users_info[user_sel_idx],
      });
    }
  }

  render() {
    let self = this;
    let user_info_sel = self.state.user_info;
    let users_info = self.state.users_info;
    let show_user_list = users_info.length > 0;
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col sm={4} xs={12}>
              <Form>
                <FormGroup controlId="formBasicText">
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Search user info here"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          {show_user_list ? (
            <Row className="show-grid">
              <Col xs={12} lgHidden mdHidden smHidden>
                <ButtonToolbar>
                  <DropdownButton title={user_info_sel.name?user_info_sel.name: "Select User"} id="select_user" onSelect={self.handleSelectUserChange}>
                    {users_info.map((user_info, index) =>
                      <MenuItem eventKey={index}>{user_info.name}</MenuItem>
                    )}
                  </DropdownButton>
                </ButtonToolbar>
              </Col> 
              <Col sm={4} xsHidden>
                <ListGroup>
                {users_info.map((user_info, index) =>
                  <ListElement user_info={user_info} index={index} list={self}>
                  </ListElement>
                )}
                </ListGroup>
              </Col>
              {user_info_sel.name ? (
                <Col sm={8} xs={12}>
                  <Row>
                    <Col sm={12}><h2>{user_info_sel.name}</h2></Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={12}><b>Address</b></Col>
                    <Col sm={8} xs={12}>
                      <div>{user_info_sel.line1}</div>
                      <div>{user_info_sel.line2}</div>
                      <div>{user_info_sel.city}, {user_info_sel.state}</div>
                      <div>{user_info_sel.zip}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={12}><b>Phone</b></Col>
                    <Col sm={8} xs={12}>{user_info_sel.phone}</Col>
                  </Row>
                </Col>
              ):(
                <Col sm={8} xs={12}>
                No user selected
                </Col>
              )}
            </Row>
          ):(<div>&nbsp;</div>)}
        </Grid>
      
      </div>
    );
  }
}

export default App;
