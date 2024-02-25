import { PurchaseState } from '@purple-2023/interfaces';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSagaStatePurchased extends BuyCourseSagaState {

	public async pay(): Promise<{ paymentLink: string; user: UserEntity; }> {
		throw new Error('payment already purchased');
	}

	public async checkPayment(): Promise<{ user: UserEntity, state: PurchaseState }> {
		throw new Error('payment already purchased');
	}
	public async cancel(): Promise<{ user: UserEntity; }> {
		throw new Error('payment already purchased');
	}

}