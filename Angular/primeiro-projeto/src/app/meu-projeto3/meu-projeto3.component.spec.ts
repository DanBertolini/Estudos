import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuProjeto3Component } from './meu-projeto3.component';

describe('MeuProjeto3Component', () => {
  let component: MeuProjeto3Component;
  let fixture: ComponentFixture<MeuProjeto3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuProjeto3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuProjeto3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
