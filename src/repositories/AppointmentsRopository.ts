import Appointment from '../models/Appointment';
import { EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointmnet = await this.findOne({
            where: {date : date},
        });

        return findAppointmnet || null;
    }
}
