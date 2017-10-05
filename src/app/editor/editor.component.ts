import {Component, OnInit, Input} from '@angular/core';

declare var JSONEditor;

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    textEditor: any;
    treeEditor: any;
    editorRef: any;

    constructor() {
    }

    // ngOnChanges(changes: SimpleChanges){
    //     if(changes['jsondata'].currentValue != null){
    //         this.editorRef.set(this.jsondata);
    //     }
    // }

    ngOnInit() {
        this.textEditor = document.getElementById('text-editor');
        this.treeEditor = document.getElementById('tree-editor');
        this.createTextObjectViewer();
        this.createTreeObjectViewer();
    }

    createTextObjectViewer() {
        let options = {
            "mode": "code",
            "search": false
        };

        let json = {
            "Array": [1, 2, 3],
            "Boolean": true,
            "Null": null,
            "Number": 123,
            "Object": {"a": "b", "c": "d"},
            "String": "Hello World"
        };

        this.editorRef = new JSONEditor(this.textEditor, options, json);
    }

    createTreeObjectViewer() {
        let options = {
            "mode": "view",
            "escapeUnicode": false,
            "sortObjectKeys": false,
            "history": false,
            "search": false,
            "indentation": 4,
            "theme": 2,
            "onEditable": {
                "field": false,
                "value": false
            }
        };

        let json = {
            "Array": [1, 2, 3],
            "Boolean": true,
            "Null": null,
            "Number": 123,
            "Object": {"a": "b", "c": "d"},
            "String": "Hello World"
        };

        this.editorRef = new JSONEditor(this.treeEditor, options, json);
    }

}