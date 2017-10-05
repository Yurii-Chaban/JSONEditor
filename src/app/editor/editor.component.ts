import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewInit, ViewChild } from '@angular/core';

declare var JSONEditor;

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnChanges, AfterViewInit {

    @ViewChild('jsoneditor') jsonEditor;

    @Input() data;

    textEditor: any;
    treeEditor: any;
    editorRef: any;
    treeRef: any;

    public json = this.data;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes['data'] && changes['data'].currentValue != null) {
            this.editorRef.set(this.data);
        }

        this.ngAfterViewInit();

        console.log("ololo");
    }

    ngOnInit() {
        this.textEditor = this.jsonEditor.nativeElement;
        this.createTextObjectViewer();
    }

    ngAfterViewInit() {
        this.treeEditor = document.getElementById('tree-editor');
        this.createTreeObjectViewer();
    }

    onEditorChange(){
      this.treeRef.set(this.editorRef.get());
      this.treeRef.expandAll();
    }

    createTextObjectViewer() {
        let options = {
            "onChange": () => { this.onEditorChange() },
            "mode": "text",
            "search": false
        };

        let json = {};

        console.log('createTextObjectViewer: ', this.json);

        this.editorRef = new JSONEditor(this.textEditor, options, json);
    }

    createTreeObjectViewer() {
        let options = {
            "mode": "view",
            "search": false,
        };

        this.treeRef = new JSONEditor(this.treeEditor, options);
    }

}
