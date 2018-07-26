import * as React from 'react';

type Props = {
  message: string;
};

class Message extends React.Component<Props> {
  render() {
    return (
      <div className="message-wrapper">
        <div className="message-default">
          DEBUG INFO:
          <hr/>
          {this.props.message}
        </div>
      </div>
    );
  }
}

export default Message;
