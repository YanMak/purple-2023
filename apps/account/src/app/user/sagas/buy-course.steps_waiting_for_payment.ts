import { PaymentCheck } from '@purple-2023/contracts';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';
import { PurchaseState } from '@purple-2023/interfaces';

export class BuyCourseSagaStateWaitingForPayment extends BuyCourseSagaState {

	public async pay(): Promise<{ paymentLink: string; user: UserEntity; }> {
		throw new Error('cant generate link for payment while current payment in process');
	}

	public async checkPayment(): Promise<{ user: UserEntity; state: PurchaseState }> {
		// send rmq
		const res = await this.saga.rmqService.send<PaymentCheck.Request, PaymentCheck.Response>(PaymentCheck.topic, { userId: this.saga.user._id, courseId: this.saga.courseId })
		if (res.state === PurchaseState.Purchased) {
			//change status to succeed
			this.saga.setState(PurchaseState.Purchased, this.saga.courseId);
			return { user: this.saga.user, state: PurchaseState.Purchased }
		}
		if (res.state === PurchaseState.Canceled) {
			//change status to canceled
			this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
			return { user: this.saga.user, state: PurchaseState.Canceled }
		}
		return { user: this.saga.user, state: PurchaseState.WaitingForPayment }
	}
	public async cancel(): Promise<{ user: UserEntity; }> {
		throw new Error('cant cancel payment in progress');
	}

}