import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailServiceService {
  constructor() {}

  sendTestDriveConfirmation(
    clientEmail: string,
    clientName: string,
    carModel: string,
    carBrand: string,
    date: string,
    time: string
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      client_email: clientEmail,
      client_name: clientName,
      car_model: carModel,
      car_brand: carBrand,
      date: date,
      time: time,
    };

    return emailjs.send(
      'service_4g73tuj', // Replace with your EmailJS service ID
      'template_u74dkgb', // Replace with your EmailJS template ID
      templateParams,
      'GIFZ9JLUsKeMJntPz' // Replace with your EmailJS public API key
    );
  }

  sendTestDriveRejection(
    clientEmail: string,
    clientName: string,
    carModel: string,
    date: string,
    time: string
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      client_email: clientEmail,
      client_name: clientName,
      car_model: carModel,
      date: date,
      time: time,
    };

    return emailjs.send(
      'service_4g73tuj', // Replace with your EmailJS service ID
      'template_x7tywyw', // Replace with your EmailJS template ID
      templateParams,
      'GIFZ9JLUsKeMJntPz' // Replace with your EmailJS public API key
    );
  }

  async sendReservationWithPDF(
    clientEmail: string,
    clientName: string,
    reservationId: string,
    paiementData: any
  ): Promise<EmailJSResponseStatus> {
    // Generate the PDF

    // Prepare email parameters
    const templateParams = {
      client_email: clientEmail,
      client_name: clientName,
      reservation_id: reservationId,
    };

    // Send the email
    return emailjs.send(
      'service_4g73tuj', // Replace with your EmailJS service ID
      'template_u74dkgb', // Replace with your EmailJS template ID for attachments
      templateParams,
      'GIFZ9JLUsKeMJntPz' // Replace with your EmailJS public API key
    );
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
