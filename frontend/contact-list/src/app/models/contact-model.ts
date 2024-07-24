export interface Contact {
    id: string;
    address: string;
    email: string;
    phone: string;
    name: string;
    cell: string;
    registrationDate: string;
    age: number;
    image: string;
}

export interface ContactState {
    contacts: Contact[];
    selectedContact: Contact | null;
    error: string | null;
}