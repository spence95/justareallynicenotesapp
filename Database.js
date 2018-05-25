import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Test.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;
let db;
let notes;
let note;
let note_id;
let title;
let content;

export class Database {
    constructor() {

    }

    loadDB = () => {
        SQLite.echoTest().then(() => {
            SQLite.openDatabase({name : "testDB", createFromLocation : 1}).then((DB) => {
                db = DB;
                this.createDatabase(DB);
            }).then(() => {
                //this.closeDatabase();
            }).catch((error) => {
                throw new Error(error);
            });
        }).catch(error => {
            throw new Error(error);
        });
    }

    createDatabase = (db) => {
        db.transaction(this.createDB).then(() => {
            console.log("Database populated");
        })
    }

    createDB = (tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Notes('
        +   'note_id INTEGER PRIMARY KEY NOT NULL,'
        +   'title VARCHAR(500),'
        +   'content VARCHAR(10000));')
        .catch(error => console.log(error));
    }

    getNotes = new Promise(function(resolve, reject){
        SQLite.openDatabase({name : "testDB", createFromLocation : 1}).then((DB) => {
            DB.transaction(this.queryNotes).then((result) => { 
                if (result != undefined)
                    resolve(notes);
                else
                    reject("result is null");
            }).catch((error) => {
                reject(error);
            });
        });
    }.bind(this));

    getNoteById = (id) => {
        this.note_id = id;
        return new Promise(function(resolve, reject){
            SQLite.openDatabase({name : "testDB", createFromLocation : 1}).then((DB) => {
                DB.transaction(this.queryNotesById).then((result) => {
                    resolve(note);
                }).catch((error) => {
                    reject(error);
                });
            });
        }.bind(this));
    }

    queryNotesById = (tx) => {
        tx.executeSql('SELECT note_id, title, content FROM Notes WHERE note_id = ' + this.note_id).then(([tx, results]) => {
            note = results.rows.item(0);
        }).catch((error) => {
            console.log(error);
        });
    }

    queryNotes = (tx) => {
        tx.executeSql('SELECT note_id, title FROM Notes').then(([tx,results]) => {
            var len = results.rows.length;
            notes = [];
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                notes.push(row);
            }
        }).catch((error) => { 
            console.log(error);
        });
    }

    saveNote = (title, content) => {
        this.title = title;
        this.content = content;
        return new Promise(function(resolve, reject){
            try {
                SQLite.openDatabase({name : "testDB", createFromLocation : 1}).then((DB) => {
                    DB.transaction(this.saveNoteToDB).then(() => { 
                        resolve();
                    });
                });
            } catch(e){
                reject(e);
            }
        }.bind(this));
    }

    saveNoteToDB = (tx) => {
        tx.executeSql('INSERT INTO Notes (title, content) VALUES("' + this.title + '", "' + this.content + '");');
    }

    deleteNoteById = (id) => {
        this.note_id = id;
        return new Promise(function(resolve, reject){
            SQLite.openDatabase({name : "testDB", createFromLocation : 1}).then((DB) => {
                DB.transaction(this.deleteNoteByIdFromDB).then(() => { 
                    resolve();
                });
            });
        }.bind(this))
    }

    deleteNoteByIdFromDB = (tx) => {
        tx.executeSql('DELETE FROM Notes WHERE note_id = ' + this.note_id);
    }

    closeDatabase = () => {
        if (db) {
            db.close().then((status) => {
                return true;
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}