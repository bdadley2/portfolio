import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'statements-section',
  templateUrl: './statements-section.component.html',
  styleUrls: ['./statements-section.component.scss']
})
export class StatementsSectionComponent implements AfterViewInit {
  @ViewChild("statementSection") section: ElementRef;
  @ViewChild("box") box: ElementRef;
  @ViewChild("boxBorder") boxBorder: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    let offset = 0;
    let duration = 1000;
    this.renderer.setStyle(this.box.nativeElement, 'clip-path', 'inset(100% 100% 100% 100%)');
    this.renderer.setStyle(this.boxBorder.nativeElement, 'clip-path', 'inset(100% 100% 100% 100%)');
    document.addEventListener("scroll", event => {
      let pos = this.section!.nativeElement!.getBoundingClientRect().top
      let percent = ((-1 * pos) / duration) * 100;
      if (percent <= 0) {
        percent = 0;
        this.renderer.setStyle(this.box.nativeElement, 'clip-path', 'inset(100% 100% 100% 100%)');
        this.renderer.setStyle(this.boxBorder.nativeElement, 'clip-path', 'inset(100% 100% 100% 100%)');
        return;
      } else if (percent < 100) { 
        this.renderer.setStyle(this.boxBorder.nativeElement, 'background-color', 'var(--system-red)');
        this.renderer.setStyle(this.box.nativeElement, 'inset', `10px`);
      } else {
        this.renderer.setStyle(this.boxBorder.nativeElement, 'background-color', 'transparent');
        this.renderer.setStyle(this.box.nativeElement, 'inset', `0`);
      }
      this.renderer.setStyle(this.box.nativeElement, 'clip-path', 
      `inset(${100 - percent}% ${100 - percent}% ${100 - percent}% ${100 - percent}%)`);
      this.renderer.setStyle(this.boxBorder.nativeElement, 'clip-path', 
      `inset(${100 - percent}% ${100 - percent}% ${100 - percent}% ${100 - percent}%)`); 
     }, { passive: true });
  }

}
