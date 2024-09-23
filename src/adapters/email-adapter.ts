import nodemailer from "nodemailer"

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        let transport = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: 'skyline96@internet.ru',
                pass: 'nNWqycxxive0ru7Q842G'
            }
        })

        let info = await transport.sendMail({
            from: '"Дмитрий Абрасимовский" <skyline96@internet.ru>',
            to: email,
            subject: subject,
            html: message
        })
        return info;
    }
};