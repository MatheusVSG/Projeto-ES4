import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalhadoComponent } from './cliente-detalhado.component';

describe('ClienteDetalhadoComponent', () => {
  let component: ClienteDetalhadoComponent;
  let fixture: ComponentFixture<ClienteDetalhadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDetalhadoComponent]
    });
    fixture = TestBed.createComponent(ClienteDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
