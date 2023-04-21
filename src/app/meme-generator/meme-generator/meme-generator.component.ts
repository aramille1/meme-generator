import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss'],
})
export class MemeGeneratorComponent {
  @ViewChild('memeCanvas', { static: false }) myCanvas: any;
  @ViewChild('editor') editor: any;

  quillConfig = {
    toolbar: {
      container: [
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
      ],
    },
  };

  fontSize: string | undefined;
  fontFamily: undefined;
  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000';
  bgColor: string = '#f9f9f9';
  show: boolean = false;

  onTopTextChange(e: any) {
    this.topText = e.text;
    this.calculateFont(e);
  }

  calculateFont(event: any) {
    let size, font, fontSize;
    event.content.ops.forEach((obj: any) => {
      if (obj.attributes) {
        size = obj.attributes.size;
        font = obj.attributes.font;
      }
    });

    if (size) {
      switch (size) {
        case 'small':
          fontSize = '20px';
          break;
        case 'large':
          fontSize = '29.5px';
          break;
        case 'huge':
          fontSize = '42.5px';
          break;
      }
    } else {
      fontSize = '23px';
    }
    this.fontSize = fontSize;
    this.fontFamily = font;
    this.drawText();
  }

  onBottomTextChange(e: any) {
    this.bottomText = e.text;
    this.calculateFont(e);
  }

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    let context = canvas.getContext('2d');
    context.font = '40px monospace';
    context.textAlign = 'center';
    context.fillStyle = '#5d5d5d';
    context.fillText(
      'upload your image here..',
      canvas.width / 2,
      canvas.height / 2
    );
  }
  onImageUpload(e: any) {
    this.fileEvent = e;
    let canvas = this.myCanvas.nativeElement;
    let context = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        context.fillStyle = this.bgColor;
        // params: image, left/right positioning, top/bottom positioning
        context.drawImage(image, 50, 150, 600, 500);
        this.show = true;
      };
    };
  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let context = canvas.getContext('2d');
    // reseting params of canvas to 0, and width/height back original size of canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    // creating new canvas
    this.onImageUpload(this.fileEvent);
    // styling the canvas
    context.fillStyle = this.textColor;
    context.font = `${this.fontSize} ${this.fontFamily}`;
    context.textAlign = 'center';
    // params: text, left/right positioning, top/bottom positioning
    context.fillText(this.topText, canvas.width / 2, 100);
    context.fillText(this.bottomText, canvas.width / 2, 750);
  }

  onTextColorChange($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  onBgColorChange($event: ColorEvent) {
    this.bgColor = $event.color.hex;
    this.drawText();
  }

  download() {
    let canvas = this.myCanvas.nativeElement;
    // converting canvas to image with png format
    let image = canvas.toDataURL('image/jpg');
    let link = document.createElement('a');
    link.download = 'meme.jpg';
    link.href = image;
    link.click();
  }
}
