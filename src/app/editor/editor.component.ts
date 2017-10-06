import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

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

    public reactiveForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.reactiveForm = this.fb.group({
            result: null
        });
    }

    uploadJson($event){
        if(!$event.srcElement.files || $event.srcElement.files.length == 0 || $event.srcElement.files[0].type != 'application/json'){
            return;
        }
        let file = $event.srcElement.files[0];
        let fr = new FileReader();

        fr.onload = (e) => {
            let result = JSON.parse(fr.result);
            this.editorRef.set(result);
            this.onEditorChange();
            this.reactiveForm.setValue({
                result: result
            });
        };

        fr.readAsText(file);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes['data'] && changes['data'].currentValue != null) {
            this.editorRef.set(this.data);
        }

        this.createTreeEditorMetod();
    }

    ngOnInit() {
        this.textEditor = this.jsonEditor.nativeElement;
        this.createTextObjectViewer();
    }

    ngAfterViewInit() {
        this.createTreeEditorMetod();
    }

    private createTreeEditorMetod() {
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
