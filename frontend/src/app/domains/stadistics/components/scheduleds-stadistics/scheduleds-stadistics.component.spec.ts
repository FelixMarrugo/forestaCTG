import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScheduledsStadisticsComponent } from './scheduleds-stadistics.component';

describe('ScheduledsStadisticsComponent', () => {
  let component: ScheduledsStadisticsComponent;
  let fixture: ComponentFixture<ScheduledsStadisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledsStadisticsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledsStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
