import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactDto } from '../models/contat.dto';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);
    private apiUrl = 'https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile';

    getProfiles(): Observable<ContactDto[]> {
        return this.http.get<ContactDto[]>(this.apiUrl);
    }

    deleteProfile(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createProfile(profile: ContactDto): Observable<ContactDto> {
        return this.http.post<ContactDto>(this.apiUrl, profile);
    }

    updateProfile(id: number, profile: ContactDto): Observable<ContactDto> {
        return this.http.put<ContactDto>(`${this.apiUrl}/${id}`, profile);
    }
}
