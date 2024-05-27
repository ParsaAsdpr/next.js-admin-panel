type Notification = {
    id: number;
    title: string;
    body: string;
    receiverId: number;
    isRead: boolean;
    sentAt: Date;
}

export default Notification;