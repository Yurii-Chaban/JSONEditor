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
            onChange: () => { this.onEditorChange() },
            "mode": "text", // use code or text
            "search": false
        };

        let json = {
            "widget": {
                "debug": "on",
                "window": {
                    "title": "Sample Konfabulator Widget",
                    "name": "main_window",
                    "width": 500,
                    "height": 500
                },
                "image": {
                    "src": "Images/Sun.png",
                    "name": "sun1",
                    "hOffset": 250,
                    "vOffset": 250,
                    "alignment": "center"
                },
                "text": {
                    "data": "Click Here",
                    "size": 36,
                    "style": "bold",
                    "name": "text1",
                    "hOffset": 250,
                    "vOffset": 100,
                    "alignment": "center",
                    "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
                }
            }
        };;

        console.log('createTextObjectViewer: ', this.json);

        this.editorRef = new JSONEditor(this.textEditor, options, json);
    }

    createTreeObjectViewer() {
        let options = {
            "mode": "view",
            "search": false,
        };

        let json = {
            "widget": {
                "debug": "on",
                    "window": {
                    "title": "Sample Konfabulator Widget",
                        "name": "main_window",
                        "width": 500,
                        "height": 500
                },
                "image": {
                    "src": "Images/Sun.png",
                        "name": "sun1",
                        "hOffset": 250,
                        "vOffset": 250,
                        "alignment": "center"
                },
                "text": {
                    "data": "Click Here",
                        "size": 36,
                        "style": "bold",
                        "name": "text1",
                        "hOffset": 250,
                        "vOffset": 100,
                        "alignment": "center",
                        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
                }
            }
        };

        console.log('createTreeObjectViewer: ', this.json);

        this.treeRef = new JSONEditor(this.treeEditor, options, json);
    }

}
