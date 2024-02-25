import { PurchaseState_Alari } from '@purple-2023/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity_Alari } from '../entities/user.entity';
import { BuyCourseSagaState_Alari } from './buy-course.state';
import { BuyCourseSagaStateCanceled_Alari, BuyCourseSagaStatePurchased_Alari, BuyCourseSagaStateWaitingForPayment_Alari, BuyCourseSagaStateStarted_Alari } from './buy-course.steps';

export class BuyCourseSaga_Alari {
	private state: BuyCourseSagaState_Alari;

	constructor(public user: UserEntity_Alari, public courseId: string, public rmqService: RMQService) {
		this.setState(user.getCourseState(courseId), courseId);
	}

	setState(state: PurchaseState_Alari, courseId: string) {
		switch (state) {
			case PurchaseState_Alari.Started:
				this.state = new BuyCourseSagaStateStarted_Alari();
				break;
			case PurchaseState_Alari.WaitingForPayment:
				this.state = new BuyCourseSagaStateWaitingForPayment_Alari();
				break;
			case PurchaseState_Alari.Purchased:
				this.state = new BuyCourseSagaStatePurchased_Alari();
				break;
			case PurchaseState_Alari.Cenceled:
				this.state = new BuyCourseSagaStateCanceled_Alari();
				break;
		}
		this.state.setContext(this);
		this.user.setCourseStatus(courseId, state);
	}

	getState() {
		return this.state;
	}
}