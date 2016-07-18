import React, { Component } from 'react';
import Immutable from 'immutable';

import Note from './Note';
import CreateBar from './CreateBar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }
  addNote(title) {
    const id = Math.random().toString(36).substr(2, 9);
    const noteInstance = {
      title,
      text: '',
      x: 0,
      y: 0,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set(id, noteInstance),
    });
  }
  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }
  updateNote(id, newNote) {
    this.setState({
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, newNote); }),
    });
    console.log(this.state.notes);
  }

  render() {
    return (
      <div>
        <CreateBar addNote={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} deleteNote={this.deleteNote} updateNote={this.updateNote} />)}
      </div>
    );
  }
}

export default App;
