import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
    let savedData = [];
    if(localStorage.getItem('notes')){
        savedData = JSON.parse(localStorage.getItem('notes'));
    }
    const [notes, setNotes] = React.useState(savedData);
    console.log(notes)
    const [currentNoteId, setCurrentNoteId] = React.useState(
        notes[0] && notes[0].id || ""
    );

    React.useEffect(()=>{
        localStorage.setItem('notes',JSON.stringify(notes));
    },[notes]);

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your note here."
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    function updateNote(text) {
        let newNotes = notes.map(note => {
            if (note.id === currentNoteId) {
                return {
                    ...note,
                    body: text
                }
            }
            return note;
        });
        let idx = newNotes.findIndex(note => note.id === currentNoteId);
        let temp = newNotes[0];
        newNotes[0] = newNotes[idx];
        newNotes[idx] = temp;
        setNotes(newNotes);
        console.log(newNotes)
    }

    function deleteNote(event, noteId) {
        event.stopPropagation();
        setNotes(prevNotes => prevNotes.filter(note => note.id != noteId));
    }

    function findCurrentNote() {
        if(notes && notes.length == 0){
            createNewNote();
        }
        return notes.find(note => note.id === currentNoteId) || notes[0];
    } 
    return (
        <>
            <main>
                {
                    notes.length > 0
                        ?
                        <Split
                            sizes={[30, 70]}
                            direction='horizontal'
                            className='split'
                        >
                            <Sidebar
                                notes={notes}
                                currentNote={findCurrentNote()}
                                setCurrentNoteId={setCurrentNoteId}
                                newNote={createNewNote}
                                deleteNote={deleteNote} 
                            />
                            {
                                currentNoteId &&
                                notes.length > 0 &&
                                <Editor
                                    currentNote={findCurrentNote()}
                                    updateNote={updateNote}
                                />
                            }
                        </Split>
                        :
                        <div className='no-notes'>
                            <h1>You have no notes</h1>
                            <button
                                onClick={createNewNote}
                                className='first-note'>
                                Create one now
                            </button>
                        </div>
                }
            </main>
        </>
    );
}