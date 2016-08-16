import React, { Component } from 'react';
import Immutable from 'immutable';
import io from 'socket.io-client';
const socketserver = 'http://localhost:9090';

import Note from './Note';
import CreateBar from './CreateBar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      maxzIndex: 0,
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
      x: 25,
      y: 10,
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
      maxzIndex: this.state.maxzIndex + 1,
    });
  }

  render() {
    return (
      <div className="master_flex">
        <CreateBar addNote={this.addNote} />
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} maxzIndex={this.state.maxzIndex} deleteNote={this.deleteNote} updateNote={this.updateNote} />)}
        </div>
      </div>
    );
  }
}

export default App;
