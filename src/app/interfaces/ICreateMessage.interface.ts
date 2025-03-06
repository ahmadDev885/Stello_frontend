export interface ICreateMessage {
    data?: string;
    is_sms?:boolean;
    is_email?:boolean;
    subject?: string;
}