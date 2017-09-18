import { Component, OnInit, Directive} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = "http://loiane.training";
  urlImg: string = 'http://lorempixel.com/400/200/sports/1';
  
  nome: string = 'Daniel Bertolini';
  
  constructor() { console.log('constructor'); }

  getValores(){
    return [10, 11, 12];
  }

  clique(){
    alert('Teste');
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event.keyCode);
  }
  deletar(event: KeyboardEvent) {
    alert('Deletou o ' + event.key);
  }
  ngOnInit() {
    console.log('ngOnInit');
  }

}
