import { CourseGetCourse_Alari, PaymentCheck_Alari, PaymentGenerateLink_Alari, PaymentStatus_Alari } from '@purple-2023/contracts';
import { PurchaseState_Alari } from '@purple-2023/interfaces';
import { UserEntity_Alari } from '../entities/user.entity';
import { BuyCourseSagaState_Alari } from './buy-course.state';

export class BuyCourseSagaStateStarted_Alari extends BuyCourseSagaState_Alari {
	public async pay(): Promise<{ paymentLink: string; user: UserEntity_Alari; }> {
		const { course } = await this.saga.rmqService.send<CourseGetCourse_Alari.Request, CourseGetCourse_Alari.Response>(CourseGetCourse_Alari.topic, {
			id: this.saga.courseId
		});
		if (!course) {
			throw new Error('Такого курса не существует');
		}
		if (course.price == 0) {
			this.saga.setState(PurchaseState_Alari.Purchased, course._id);
			return { paymentLink: null, user: this.saga.user };
		}
		const { paymentLink } = await this.saga.rmqService.send<PaymentGenerateLink_Alari.Request, PaymentGenerateLink_Alari.Response>(PaymentGenerateLink_Alari.topic, {
			courseId: course._id,
			userId: this.saga.user._id,
			sum: course.price
		});
		this.saga.setState(PurchaseState_Alari.WaitingForPayment, course._id);
		return { paymentLink, user: this.saga.user };
	}
	public checkPayment(): Promise<{ user: UserEntity_Alari; status: PaymentStatus_Alari }> {
		throw new Error('Нельзя проверить платёж, который не начался');
	}
	public async cencel(): Promise<{ user: UserEntity_Alari; }> {
		this.saga.setState(PurchaseState_Alari.Cenceled, this.saga.courseId);
		return { user: this.saga.user };
	}
}

export class BuyCourseSagaStateWaitingForPayment_Alari extends BuyCourseSagaState_Alari {
	public pay(): Promise<{ paymentLink: string; user: UserEntity_Alari; }> {
		throw new Error('Нельзя создать ссылку на оплату в процессе');
	}
	public async checkPayment(): Promise<{ user: UserEntity_Alari; status: PaymentStatus_Alari }> {
		const { status } = await this.saga.rmqService.send<PaymentCheck_Alari.Request, PaymentCheck_Alari.Response>(PaymentCheck_Alari.topic, {
			userId: this.saga.user._id,
			courseId: this.saga.courseId
		});
		if (status === 'canceled') {
			this.saga.setState(PurchaseState_Alari.Cenceled, this.saga.courseId);
			return { user: this.saga.user, status: 'canceled' };
		}
		if (status === 'success') {
			return { user: this.saga.user, status: 'success' };
		}
		this.saga.setState(PurchaseState_Alari.Purchased, this.saga.courseId);
		return { user: this.saga.user, status: 'progress' };
	}
	public cencel(): Promise<{ user: UserEntity_Alari; }> {
		throw new Error('Нельзя отменить платёж в процессе');
	}
}

export class BuyCourseSagaStatePurchased_Alari extends BuyCourseSagaState_Alari {
	public pay(): Promise<{ paymentLink: string; user: UserEntity_Alari; }> {
		throw new Error('Нельзя оплатить купленный курс');
	}
	public checkPayment(): Promise<{ user: UserEntity_Alari; status: PaymentStatus_Alari }> {
		throw new Error('Нельзя проверить платёж по купленному курсу');
	}
	public cencel(): Promise<{ user: UserEntity_Alari; }> {
		throw new Error('Нельзя отменить купленный курс');
	}
}

export class BuyCourseSagaStateCanceled_Alari extends BuyCourseSagaState_Alari {
	public pay(): Promise<{ paymentLink: string; user: UserEntity_Alari; }> {
		this.saga.setState(PurchaseState_Alari.Started, this.saga.courseId);
		return this.saga.getState().pay();
	}
	public checkPayment(): Promise<{ user: UserEntity_Alari; status: PaymentStatus_Alari }> {
		throw new Error('Нельзя проверить платёж по отменённому курсу');
	}
	public cencel(): Promise<{ user: UserEntity_Alari; }> {
		throw new Error('Нельзя отменить откменённый курс');
	}
}