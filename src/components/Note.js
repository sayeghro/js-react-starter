import React, { Component } from 'react';
import Draggable from 'react-draggable'; // Both at the same time
import marked from 'marked';


class Note extends Component {
  // Constructor
  constructor(props) {
    super(props);
    Note.propTypes = {
      deleteNote: React.PropTypes.func,
      updateNote: React.PropTypes.func,
    };

    this.state = {
      id: this.props.id,
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
      isEditor: false,
    };
    this.onEdit = this.onEdit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }

  // Set state change
  onEdit(event) {
    if (this.state.isEditor) {
      this.setState({ isEditor: false });
      this.props.updateNote(this.state.id, this.state);
    } else {
      this.setState({ isEditor: true });
    }
  }
  onDelete(event) {
    this.props.deleteNote(this.state.id);
  }
  onInputChange(event) {
    this.setState({ text: event.target.value });
  }
  onStartDrag() {
    this.setState({ zIndex: this.props.maxzIndex + 1 });
    this.props.updateNote(this.state.id, this.state);
  }
  onStopDrag() {
    this.props.updateNote(this.state.id, this.state);
  }
  handleDrag(e, ui) {
    const StateX = this.state.x;
    const StateY = this.state.y;
    this.setState({
      x: StateX + ui.deltaX,
      y: StateY + ui.deltaY,
    });
  }
  MarkItUp() {
    return { __html: marked(this.state.text) };
  }
  renderTheBox() {
    if (this.state.isEditor) {
      return <textarea onChange={this.onInputChange} className="markdown_box" defaultValue={this.state.text}></textarea>;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={this.MarkItUp()}></div>;
    }
  }
  renderIcon() {
    if (this.state.isEditor) {
      return <i className="fa fa-check paddleft" aria-hidden="true" onClick={this.onEdit}></i>;
    } else {
      return <i className="fa fa-pencil paddleft" aria-hidden="true" onClick={this.onEdit}></i>;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.handleDrag}
        onStop={this.onStopDrag}
        bounds="parent"
      >
        <div className="note_container" style={{ zIndex: this.state.zIndex }}>
          <div className="toolbar">
            <div className="toolbar_leftflex">
              <h1>{this.state.title}</h1>
              <i className="fa fa-trash-o paddleft" aria-hidden="true" onClick={this.onDelete}></i>
              {this.renderIcon()}
            </div>
            <div className="toolbar_rightflex">
              <i className="fa fa-arrows-alt note-mover paddleft" aria-hidden="true"></i>
            </div>
          </div>
          {this.renderTheBox()}
        </div>
      </Draggable>
  );
  }
}

export default Note;
