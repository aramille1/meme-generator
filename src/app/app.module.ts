import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ColorChromeModule } from 'ngx-color/chrome';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { MemeGeneratorComponent } from './meme-generator/meme-generator/meme-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeGeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorChromeModule,
    CommonModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
