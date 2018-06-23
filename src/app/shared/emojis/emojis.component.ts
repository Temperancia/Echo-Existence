import { Component, OnInit, EventEmitter, Output } from '@angular/core';
//import { Ng2EmojiService } from 'ng2-emoji';

@Component({
  selector: 'app-emojis',
  templateUrl: 'emojis.component.html',
  styleUrls: ['emojis.component.scss']
})
export class EmojisComponent implements OnInit {
  public visible = false;
  private emojis: Array<String>;
  public actualEmojis: Array<Array<String>>;
  private currentRow = 0;
  private rowsDisplayed: Array<Boolean> = [];
  @Output() onEmoji = new EventEmitter<String>();
  constructor() {
    this.emojis = []//Ng2EmojiService.emojis;
    this.actualEmojis = [];
    for (let emoji = 0, index = -1; emoji < this.emojis.length; emoji++) {
      if (emoji % 10 === 0) {
        if (emoji !== 0) {
          this.rowsDisplayed.push(false);
        } else {
          this.rowsDisplayed.push(true);
        }
        this.actualEmojis.push([]);
        ++index;
      }
      this.actualEmojis[index].push(':' + this.emojis[emoji] + ':');
    }
  }
  ngOnInit() {
  }
  public show(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.visible = true;
    }
  }
  public hide(): void {
    this.rowsDisplayed[this.currentRow] = false;
    this.currentRow = 0;
    this.rowsDisplayed[this.currentRow] = true;

    this.visible = false;
    //setTimeout(() => this.visible = false, 300);
  }
  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  public isDisplayed(index: number): Boolean {
    return this.rowsDisplayed[index];
  }
  public previousRow(): void {
    this.rowsDisplayed[this.currentRow] = false;
    --this.currentRow;
    if (this.currentRow === -1) {
      this.currentRow = this.rowsDisplayed.length - 1;
    }
    this.rowsDisplayed[this.currentRow] = true;
  }
  public nextRow(): void {
    this.rowsDisplayed[this.currentRow] = false;
    ++this.currentRow;
    if (this.currentRow >= this.rowsDisplayed.length) {
      this.currentRow = 0 ;
    }
    this.rowsDisplayed[this.currentRow] = true;
  }
  private addEmoji(emoji): void {
    this.onEmoji.emit(emoji);
  }
}
