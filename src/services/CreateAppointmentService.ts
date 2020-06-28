import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRopository';
import {getCustomRepository} from 'typeorm';


import AppError from '../errors/AppError';

interface RequestDTO{
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService {

    public async execute({provider_id, date} : RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmnetInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        // Se tiver datas iguais
        if (findAppointmnetInSameDate) {
            throw new AppError('This appointement is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // Salvar no banco
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
