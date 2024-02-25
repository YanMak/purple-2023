import { PurchaseState } from '@purple-2023/interfaces';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSagaStateCanceled extends BuyCourseSagaState {

	public async pay(): Promise<{ paymentLink: string, user: UserEntity; }> {
		this.saga.setState(PurchaseState.Started, this.saga.courseId);
		//return { paymentLink: undefined, user: this.saga.user };
		return this.saga.getState().pay()
	}

	public async checkPayment(): Promise<{ user: UserEntity, state: PurchaseState }> {
		throw new Error('payment already canceled');
	}
	public async cancel(): Promise<{ user: UserEntity; }> {
		throw new Error('payment already canceled');
	}

}