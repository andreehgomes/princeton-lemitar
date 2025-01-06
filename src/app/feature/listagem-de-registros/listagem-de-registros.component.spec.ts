import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDeRegistrosComponent } from './listagem-de-registros.component';

describe('ListagemDeRegistrosComponent', () => {
  let component: ListagemDeRegistrosComponent;
  let fixture: ComponentFixture<ListagemDeRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemDeRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemDeRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
