import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacoteServicoComponent } from './pacote-servico.component';

describe('PacoteServicoComponent', () => {
  let component: PacoteServicoComponent;
  let fixture: ComponentFixture<PacoteServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacoteServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacoteServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
