import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretiveNgIfComponent } from './diretive-ng-if.component';

describe('DiretiveNgIfComponent', () => {
  let component: DiretiveNgIfComponent;
  let fixture: ComponentFixture<DiretiveNgIfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretiveNgIfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretiveNgIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
