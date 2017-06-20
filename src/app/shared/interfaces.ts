import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface IUser {
    id: number;
    username: string;
    email: string;
    location: String;
    organisation: String;
    category: String;
    sector: String
}
