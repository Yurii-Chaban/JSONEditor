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

    ngOnInit() {
        this.textEditor = document.getElementById('text-editor');
        this.treeEditor = document.getElementById('tree-editor');
        this.createTextObjectViewer();
        this.createTreeObjectViewer();
    }

    createTextObjectViewer() {
        let options = {
            "mode": "text", // use code or text
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