import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuProjeto2Component } from './meu-projeto2.component';

describe('MeuProjeto2Component', () => {
  let component: MeuProjeto2Component;
  let fixture: ComponentFixture<MeuProjeto2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuProjeto2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuProjeto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
