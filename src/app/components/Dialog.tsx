import * as React from 'react';

type Props = {
  title: string;
};

class Dialog extends React.Component<Props> {

  render(): React.ReactNode {

    const {title, children} = this.props;

    return (
      <div>
        <div className="dialog-header">
          <div className="dialog-header-title">{title}</div>
          <div className="dialog-h-close-icon">&times;</div>
        </div>
        <div className="dialog-content">{children}</div>
        <div className="dialog-footer">
          <button className="dialog-cancel-btn operate-btn btn-info">取消</button>
          <button className="dialog-confirm-btn operate-btn btn-warn">确定</button>
        </div>
      </div>
    );
  }
}

export default Dialog;
