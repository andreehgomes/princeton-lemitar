import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoRegistroComponent } from './novo-registro.component';

describe('NovoRegistroComponent', () => {
  let component: NovoRegistroComponent;
  let fixture: ComponentFixture<NovoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
