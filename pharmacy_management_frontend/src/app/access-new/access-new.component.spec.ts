import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNewComponent } from './access-new.component';

describe('AccessNewComponent', () => {
  let component: AccessNewComponent;
  let fixture: ComponentFixture<AccessNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
