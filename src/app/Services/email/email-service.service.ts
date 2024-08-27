import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { jsPDF } from 'jspdf';

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
    const pdfBlob = this.generatePDF(reservationId, paiementData);

    // Convert the PDF Blob to Base64
    const pdfBase64 = await this.blobToBase64(pdfBlob);

    // Prepare email parameters
    const templateParams = {
      client_email: clientEmail,
      client_name: clientName,
      reservation_id: reservationId,
      pdf_attachment: pdfBase64, // Base64 string for the PDF
    };

    // Send the email
    return emailjs.send(
      'service_4g73tuj', // Replace with your EmailJS service ID
      'template_u74dkgb', // Replace with your EmailJS template ID for attachments
      templateParams,
      'GIFZ9JLUsKeMJntPz' // Replace with your EmailJS public API key
    );
  }

  private generatePDF(reservationId: string, paiementData: any): Blob {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text(`Reservation ID: ${reservationId}`, 10, 10);
    doc.text(`Name: ${paiementData.name}`, 10, 20);
    doc.text(`Amount: ${paiementData.amount}`, 10, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 40);

    // Convert PDF to Blob
    return doc.output('blob');
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
