import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-text-editor',
    imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTooltipModule],
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements AfterViewInit {
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<string>();
  @ViewChild('editor') editor!: ElementRef;

  // ngOnInit() {
  //   const editor = document.getElementById('editor');
  //   if (editor) {
  //     editor.innerHTML = this.content;
  //   }
  // }

  ngAfterViewInit() {
    if (this.editor) {
      this.editor.nativeElement.innerHTML = this.content;
      this.editor.nativeElement.addEventListener('input', () => {
        this.contentChange.emit(this.editor.nativeElement.innerHTML);
      });
    }
  }

  pasteAsPlainText() {
    navigator.clipboard
      .readText()
      .then((text) => {
        const selection = window.getSelection();

        if (!selection) {
          return;
        }

        if (!selection.rangeCount) {
          return;
        }

        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(text));
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  changeFontFamily(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const fontFamily = selectElement.value;
  document.execCommand('fontName', false, fontFamily);
}

  execCommand(command: string, value: string | null = null) {
    // @ts-ignore
    document.execCommand(command, false, value);
    this.emitContentChange();
  }

  changeColor(command: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.execCommand(command, input.value);
  }

  createLink() {
    const url = prompt('Enter the URL', 'http://');
    if (url) {
      this.execCommand('createLink', url);
    }
  }

  changeFontSize(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.execCommand('fontSize', select.value);
  }

  private emitContentChange() {
    const editor = document.getElementById('editor');
    if (editor) {
      // const editor = document.querySelector('.editor-container');
      console.log(editor);
      console.log('EMIT CHANGE!!');
      console.log(editor.innerHTML);
      this.contentChange.emit(editor.innerHTML);
    }
  }
}
