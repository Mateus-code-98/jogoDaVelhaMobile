export interface userInterface {
    id: string;
    name: string;
    email: string;
    friendlyId: string;
    photoUrl: string;
    status: 'on' | 'off';
    createdAt: string;
    updatedAt: string;
    friendshipId: string;
}