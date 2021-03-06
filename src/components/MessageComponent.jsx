import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, List, Icon } from 'semantic-ui-react';
import { updateMessage, deleteMessage } from '../actions';
import { DELETED_ITEMS, FLAG_MESSAGE, UNREAD_MESSAGE } from '../constants/AppConstants';
import './css/messageComponent.css';

export class MessageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedMessage: undefined };
  }

  /**
   * This method is used to handle click event of message list item.
   * @param {*} e 
   * @param {*} selectedMessage 
   */
  handleItemClick = (e, selectedMessage) => {
    e.stopPropagation();
    this.setState({ selectedMessage });
    this.props.updateMessage(selectedMessage.mId, this.props.wholeData, this.props.activeItem, UNREAD_MESSAGE);
  }
  /**
   * This method is used to delete indivisual message.
   * @param {*} e 
   * @param {*} selectedMessage 
   */
  deleteMessage = (e, selectedMessage) => {
    e.stopPropagation();
    if (this.props.activeItem !== DELETED_ITEMS) {
      this.props.deleteMessage(selectedMessage, this.props.wholeData, this.props.activeItem, this.props.deletedData);
      this.setState({ selectedMessage: undefined });
    }
  }
  /**
   * This method is used to set indivisual flag.
   * @param {*} e 
   * @param {*} selectedMessage 
   */
  flagMessage = (e, selectedMessage) => {
    e.stopPropagation();
    this.props.updateMessage(selectedMessage.mId, this.props.wholeData, this.props.activeItem, FLAG_MESSAGE);
  }

  render() {
    let wholeData = [];
    const { activeItem, setFlaggedData, inboxFlaggedData } = this.props;
    const { selectedMessage } = this.state;
    if (setFlaggedData) {
      wholeData = Object.assign(inboxFlaggedData, []);
    } else {
      wholeData = Object.assign(this.props.wholeData, []);
    }
    const listWidget = wholeData.map((dataObject, index) => {
      return (
        <List.Item onClick={(e) => this.handleItemClick(e, dataObject)} key={index} className={dataObject.unread ? 'verticalLine list-divider' : 'list-divider'}>
          <List.Content className='list-content'>
            {activeItem !== DELETED_ITEMS && <Icon className='delete calendar delete-icon' onClick={(e) => this.deleteMessage(e, dataObject)}></Icon>}
            {dataObject.isFlag ? <Icon className='flag delete-icon' onClick={(e) => this.flagMessage(e, dataObject)}></Icon> :
              <Icon className='flag outline delete-icon' onClick={(e) => this.flagMessage(e, dataObject)}></Icon>}
            <List.Header as='a' className='list-header'>{dataObject.subject}</List.Header>
            <div className='text-single-line' dangerouslySetInnerHTML={{ __html: `${dataObject.content}` }}>
            </div>
          </List.Content>
        </List.Item>
      );
    });
    return (
      <div> <Grid celled>
        <Grid.Row>
          <Grid.Column width={5} style={{ padding: 0 }}>
            <List selection>{listWidget}</List>
          </Grid.Column>
          <Grid.Column width={11}>
            {!selectedMessage ? <div className='empty-message'>Select an item to read</div> :
              <div>
                <List.Item>
                  <List.Content className='list-content'>
                    <List.Header className='list-header'>{selectedMessage.mId}</List.Header>
                    <div className='selected-message-title'>
                      <List.Header as='a' className='list-header'>{selectedMessage.subject}</List.Header>
                    </div>
                    <div className='selected-message' dangerouslySetInnerHTML={{ __html: `${selectedMessage.content}` }}></div>
                  </List.Content>
                </List.Item>
              </div>}
          </Grid.Column>
        </Grid.Row>
      </Grid></div>
    );
  }
}

const mapDispatchToProps = {
  updateMessage: updateMessage,
  deleteMessage: deleteMessage
};

const mapStateToProps = (state) => ({
  inboxData: state.inboxData,
  spamData: state.spamData,
  customData: state.customData,
  deletedData: state.deletedData,
  inboxFlaggedData: state.inboxFlaggedData,
  setFlaggedData: state.setFlaggedData
})

MessageComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageComponent);

export default MessageComponent;
