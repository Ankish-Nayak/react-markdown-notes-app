import React from "react";

export default function Sidebar(props) {
    const { notes, currentNote, setCurrentNoteId, newNote, deleteNote} = props; 

    const noteElements = notes.map((note) => {
        return <div key={note.id} className={`sidebar--content--tab ${currentNote.id === note.id ? 'selectedTab' : ""}`} onClick={() => {
            setCurrentNoteId(note.id);
        }}>
            <span className='sidebar--content--tab--content text-snippt'>{note.body.split('\n')[0] || `Note`}</span>
            <span className='sidebar--content--tab--icon'
                onClick={(event)=>{
                    deleteNote(event,note.id)
                }}><i className="gg-trash"></i></span>
        </div>
    })


    return (
        <section className='pane sidebar'>
            <div className='sidebar--header'>
                <h1 className='sidebar--header--heading'>Notes</h1>
                <button className='sidebar--header--button'
                    onClick={newNote}>+</button>
            </div>
            <div className='sidebar--content'>
                {
                    noteElements
                }
            </div>
        </section>
    );
}