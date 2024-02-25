import { PaymentStatus_Alari } from '@purple-2023/contracts';
import { UserEntity_Alari } from '../entities/user.entity';
import { BuyCourseSaga_Alari } from './buy-course.saga';

export abstract class BuyCourseSagaState_Alari {
	public saga: BuyCourseSaga_Alari;

	public setContext(saga: BuyCourseSaga_Alari) {
		this.saga = saga;
	}

	public abstract pay(): Promise<{ paymentLink: string, user: UserEntity_Alari }>;
	public abstract checkPayment(): Promise<{ user: UserEntity_Alari, status: PaymentStatus_Alari }>;
	public abstract cencel(): Promise<{ user: UserEntity_Alari }>;
}