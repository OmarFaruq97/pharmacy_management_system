import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedMedicieneComponent } from './received-mediciene.component';

describe('ReceivedMedicieneComponent', () => {
  let component: ReceivedMedicieneComponent;
  let fixture: ComponentFixture<ReceivedMedicieneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedMedicieneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedMedicieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
