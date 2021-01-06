import React, { Component } from 'react'
import { Menu, Grid, Label, Input, Checkbox } from 'semantic-ui-react'
import { INBOX, SPAM, DELETED_ITEMS, CUSTOM_FOLDER, DELETE_MESSAGE } from '../constants/AppConstants';
import { MessageComponent } from './MessageComponent.jsx'
import { getSpamMessages, getInboxMessages, getCustomMessages, getDeletedMessages, getInboxFlaggedMessages } from '../actions'
import { connect } from 'react-redux';
import inboxData from '../assets/inbox.json';
import spamData from '../assets/spam.json';
import customData from '../assets/custom.json';
import deletedData from '../assets/delete_folder.json';

export class MenuComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { activeItem: INBOX, isFlagChecked: true };
    this.props.getInboxMessages(inboxData);
    this.props.getSpamMessages(spamData);
    this.props.getCustomMessages(customData);
    this.props.getDeletedMessages(deletedData);
  }
  /**
   * This method is used to handle onclick of menu items like Inbox,Spam etc.
   * @param {*} e 
   * @param {*} param1 
   */
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === INBOX) {
      this.props.getInboxMessages(this.props.inboxData);
    } else if (name === SPAM) {
      this.props.getSpamMessages(this.props.spamData);
    } else if (name === CUSTOM_FOLDER) {
      this.props.getCustomMessages(this.props.customData);
    } else {
      this.props.getDeletedMessages(this.props.deletedData);
    }
  }
  /**
   * This method is used to get toggled value of flag.
   */
  handleFlagChange = () => {
    this.setState({ isFlagChecked: !this.state.isFlagChecked });
    this.props.getInboxFlaggedMessages(this.props.inboxData, this.state.isFlagChecked);
  }
  /**
   * This method is used to calculate unread message count
   * @param {*} messageList 
   */
  getUnreadMessageCount(messageList) {
    const unreadList = messageList.filter(message => message.unread);
    return unreadList.length > 0 ? unreadList.length : '';
  }

  render() {
    const { activeItem } = this.state;
    const { inboxData, spamData, customData, deletedData } = this.props;
    return (
      <div>
        <div className='search-widget'>
          <Checkbox className='search-input' slider label={<label>Flagged Inbox Messages</label>}
            onChange={this.handleFlagChange} disabled={activeItem !== INBOX} />
        </div>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Menu vertical>

                <Menu.Item name={INBOX}
                  active={activeItem === INBOX}
                  onClick={this.handleItemClick}>
                  <Label>{inboxData ? this.getUnreadMessageCount(inboxData) : ''}</Label>
                  {INBOX}
                </Menu.Item>

                <Menu.Item name={SPAM}
                  active={activeItem === SPAM}
                  onClick={this.handleItemClick}>
                  <Label>{spamData ? this.getUnreadMessageCount(spamData) : ''}</Label>
                  {SPAM}
                </Menu.Item>

                <Menu.Item name={DELETED_ITEMS}
                  active={activeItem === DELETED_ITEMS}
                  onClick={this.handleItemClick}>
                  <Label>{deletedData ? this.getUnreadMessageCount(deletedData) : ''}</Label>
                  {DELETED_ITEMS}
                </Menu.Item>

                <Menu.Item name={CUSTOM_FOLDER}
                  active={activeItem === CUSTOM_FOLDER}
                  onClick={this.handleItemClick}>
                  <Label>{customData ? this.getUnreadMessageCount(customData) : ''}</Label>
                  {CUSTOM_FOLDER}
                </Menu.Item>

              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              {activeItem === INBOX && inboxData && inboxData.length > 0 &&
                <MessageComponent wholeData={inboxData} activeItem={INBOX} />}
              {activeItem === SPAM && spamData && spamData.length > 0 &&
                <MessageComponent wholeData={spamData} activeItem={SPAM} />}
              {activeItem === CUSTOM_FOLDER && customData && customData.length > 0 &&
                <MessageComponent wholeData={customData} activeItem={CUSTOM_FOLDER} />}
              {activeItem === DELETED_ITEMS && deletedData && deletedData.length > 0 &&
                <MessageComponent wholeData={deletedData} activeItem={DELETED_ITEMS} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getSpamMessages: getSpamMessages,
  getInboxMessages: getInboxMessages,
  getCustomMessages: getCustomMessages,
  getDeletedMessages: getDeletedMessages,
  getInboxFlaggedMessages: getInboxFlaggedMessages
};

const mapStateToProps = (state) => ({
  inboxData: state.inboxData,
  spamData: state.spamData,
  customData: state.customData,
  deletedData: state.deletedData
});

MenuComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuComponent);

export default MenuComponent;
