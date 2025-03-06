import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataModalComponent } from './load-data-modal.component';

describe('LoadDataModalComponent', () => {
  let component: LoadDataModalComponent;
  let fixture: ComponentFixture<LoadDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDataModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
