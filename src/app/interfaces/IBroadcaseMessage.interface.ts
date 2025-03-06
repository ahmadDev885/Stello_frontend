export interface IBroadcaseMessage {
    message?: string;
    is_sms?:boolean;
    is_email?:boolean;
    subject?: string;
    emails?:string[];
}