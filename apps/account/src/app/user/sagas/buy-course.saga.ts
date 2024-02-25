import { PurchaseState } from '@purple-2023/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';
import { BuyCourseSagaStateStarted } from './buy-course.steps_started';
import { BuyCourseSagaStateWaitingForPayment } from './buy-course.steps_waiting_for_payment';
import { BuyCourseSagaStatePurchased } from './buy-course.steps_purchased';
import { BuyCourseSagaStateCanceled } from './buy-course.steps_canceled';

export class BuyCourseSaga {
	private state: BuyCourseSagaState;

	constructor(public user: UserEntity, public courseId: string, public rmqService: RMQService) {
		this.setState(user.getCourseState(courseId,), courseId);
	}

	public setState(state: PurchaseState, courseId: string) {
		switch (state) {
			case PurchaseState.Started:
				this.state = new BuyCourseSagaStateStarted();
				break;
			case PurchaseState.WaitingForPayment:
				this.state = new BuyCourseSagaStateWaitingForPayment();
				break;
			case PurchaseState.Purchased:
				this.state = new BuyCourseSagaStatePurchased();
				break;
			case PurchaseState.Canceled:
				this.state = new BuyCourseSagaStateCanceled();
				break;
		}
		this.state.setContext(this);
		this.user.setCourseState(courseId, state);
	}

	getState() {
		return this.state
	}
}