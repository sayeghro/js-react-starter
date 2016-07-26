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

    this.onEdit = this.onEdit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }

  // Set state change
  onEdit(event) {
    if (this.props.note.isEditor) {
      this.props.updateNote(this.props.id, {
        title: this.props.note.title,
        text: this.props.note.text,
        x: this.props.note.x,
        y: this.props.note.y,
        zIndex: this.props.note.zIndex,
        isEditor: false,
      });
    } else {
      this.props.updateNote(this.props.id, {
        title: this.props.note.title,
        text: this.props.note.text,
        x: this.props.note.x,
        y: this.props.note.y,
        zIndex: this.props.note.zIndex,
        isEditor: true,
      });
    }
  }

  onDelete(event) {
    this.props.deleteNote(this.props.id);
  }

  onInputChange(event) {
    this.props.updateNote(this.props.id, {
      title: this.props.note.title,
      text: event.target.value,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
      isEditor: this.props.note.isEditor,
    });
  }

  onStartDrag() {
    this.props.updateNote(this.props.id, {
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.maxzIndex + 1,
      isEditor: this.props.note.isEditor,
    });
  }

  onStopDrag() {
    this.props.updateNote(this.props.id, this.props.note);
  }

  handleDrag(e, ui) {
    this.props.updateNote(this.props.id, {
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x + ui.deltaX,
      y: this.props.note.y + ui.deltaY,
      zIndex: this.props.note.zIndex,
      isEditor: this.props.note.isEditor,
    });
  }

  MarkItUp() {
    return { __html: marked(this.props.note.text) };
  }

  renderTheBox() {
    if (this.props.note.isEditor) {
      return <textarea onChange={this.onInputChange} className="markdown_box" value={this.props.note.text}></textarea>;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={this.MarkItUp()}></div>;
    }
  }

  renderIcon() {
    if (this.props.note.isEditor) {
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
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.handleDrag}
        onStop={this.onStopDrag}
      >
        <div className="note_container" style={{ zIndex: this.props.note.zIndex }}>
          <div className="toolbar">
            <div className="toolbar_leftflex">
              <h1>{this.props.note.title}</h1>
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
