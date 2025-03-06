import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesDropdownComponent } from './templates-dropdown.component';

describe('TemplatesDropdownComponent', () => {
  let component: TemplatesDropdownComponent;
  let fixture: ComponentFixture<TemplatesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
