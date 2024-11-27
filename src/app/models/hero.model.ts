export interface ApiResponse {
    nameLabel: string;
    genderLabel: Gender;
    citizenshipLabel: string
    skillsLabel: string;
    occupationLabel: string;
    memberOfLabel: string;
    creatorLabel: string;
}

export interface Hero {
    name: string;
    gender: Gender;
    citizenship: string
    skills: string;
    occupation: string;
    memberOf: string;
    creator: string;
}

export enum Gender {
    M = 'male',
    F = 'female'
}