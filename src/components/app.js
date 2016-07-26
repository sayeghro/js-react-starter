import React, { Component } from 'react';
import Immutable from 'immutable';

import Note from './Note';
import CreateBar from './CreateBar';
import firebase from '../firebase';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      maxzIndex: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }
  componentDidMount() {
    console.log('feteched from firebase');
    firebase.fetchNotes((snapshot) => {
      this.setState({
        notes: Immutable.Map(snapshot.val()),
      });
    });
  }

  addNote(myTitle) {
    const id = Math.random().toString(36).substr(2, 9);
    const noteInstance = {
      title: myTitle,
      text: '',
      x: 25,
      y: 10,
      zIndex: 0,
      isEditor: false,
    };
    firebase.addNote(id, noteInstance);
  }

  deleteNote(id) {
    firebase.deleteNote(id);
  }
  updateNote(id, newNote) {
    firebase.updateNote(id, newNote);
  }

  render() {
    return (
      <div className="master_flex">
        <CreateBar addNote={this.addNote} />
          {this.state.notes.entrySeq().map(([id, note]) =>
            <Note key={id} id={id} note={note} maxzIndex={this.state.maxzIndex}
              deleteNote={this.deleteNote} updateNote={this.updateNote} onEdit={this.onEdit}
            />)}
      </div>
    );
  }
}

export default App;
