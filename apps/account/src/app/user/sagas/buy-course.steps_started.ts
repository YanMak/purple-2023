import { CourseGetCourse, PaymentGenerateLink } from '@purple-2023/contracts';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';
import { PurchaseState } from '@purple-2023/interfaces';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {

	public async pay(): Promise<{ paymentLink: string; user: UserEntity; }> {
		const { course } = await this.saga.rmqService.send<CourseGetCourse.Request, CourseGetCourse.Response>(CourseGetCourse.topic, { id: this.saga.courseId })
		if (!course) {
			throw new Error('no such course')
		}

		if (course.price == 0) {
			this.saga.setState(PurchaseState.Purchased, this.saga.courseId); // i think this is correct version
			//larichev ???
			//this.saga.user.updateCourseState(this.saga.courseId, PurchaseState.Purchased);
			return { paymentLink: '', user: this.saga.user }
		}
		const { paymentLink } = await this.saga.rmqService.send<PaymentGenerateLink.Request, PaymentGenerateLink.Response>(
			PaymentGenerateLink.topic, {
			courseId: this.saga.courseId, userId: this.saga.user._id, sum: course.price
		})
		// set state to next state
		this.saga.setState(PurchaseState.WaitingForPayment, this.saga.courseId);
		return { paymentLink, user: this.saga.user }
	}

	public checkPayment(): Promise<{ user: UserEntity, state: PurchaseState }> {
		throw new Error('Cant check the payment which not started');
	}
	public async cancel(): Promise<{ user: UserEntity; }> {
		this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
		return { user: this.saga.user }
	}

}