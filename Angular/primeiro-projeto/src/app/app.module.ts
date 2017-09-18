import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MeuProjetoComponent} from './meu-projeto/meu-projeto.component';
import { MeuProjeto2Component } from './meu-projeto2/meu-projeto2.component';
import { MeuProjeto3Component } from './meu-projeto3/meu-projeto3.component';
import { CursosModule } from './cursos/cursos.module';

@NgModule({
  declarations: [
    AppComponent,
    MeuProjetoComponent,
    MeuProjeto2Component,
    MeuProjeto3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CursosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
