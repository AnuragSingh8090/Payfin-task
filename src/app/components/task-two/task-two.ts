import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.setvice';
import { ContactDto } from '../../models/contat.dto';

@Component({
  selector: 'app-task-two',
  imports: [FormsModule],
  templateUrl: './task-two.html',
  styleUrl: './task-two.css',
})
export class TaskTwo {
  private contactService = inject(ContactService);
  private cdr = inject(ChangeDetectorRef);

  allProfiles: ContactDto[] | null = null;
  filteredProfiles: ContactDto[] = [];
  profilesLoading: boolean = false;
  searchQuery: string = '';
  currentFilter: 'all' | 'active' | 'inactive' = 'all';

  setFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.currentFilter = filter;
    let list = this.allProfiles || [];

    if (filter === 'active') {
      list = list.filter(p => p.status === true || p.status === 'true');
    } else if (filter === 'inactive') {
      list = list.filter(p => p.status === false || p.status === 'false' || !p.status);
    }

    if (this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        (p.first_name && p.first_name.toLowerCase().includes(query)) ||
        (p.last_name && p.last_name.toLowerCase().includes(query)) ||
        (p.emailId && p.emailId.toLowerCase().includes(query)) ||
        (p.mobilenumber && String(p.mobilenumber).includes(query)) ||
        (p.pan_no && p.pan_no.toLowerCase().includes(query)) ||
        (p.adhaar_no && String(p.adhaar_no).includes(query))
      );
    }

    this.filteredProfiles = list;
    this.cdr.detectChanges();
  }

  searchProfiles(): void {
    let list = this.allProfiles || [];

    if (this.currentFilter === 'active') {
      list = list.filter(p => p.status === true || p.status === 'true');
    } else if (this.currentFilter === 'inactive') {
      list = list.filter(p => p.status === false || p.status === 'false' || !p.status);
    }

    if (this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        (p.first_name && p.first_name.toLowerCase().includes(query)) ||
        (p.last_name && p.last_name.toLowerCase().includes(query)) ||
        (p.emailId && p.emailId.toLowerCase().includes(query)) ||
        (p.mobilenumber && String(p.mobilenumber).includes(query)) ||
        (p.pan_no && p.pan_no.toLowerCase().includes(query)) ||
        (p.adhaar_no && String(p.adhaar_no).includes(query))
      );
    }

    this.filteredProfiles = list;
    this.cdr.detectChanges();
  }

  formatDate(value: string | number | undefined | null): string {
    if (!value) {
      return 'unknown';
    }
    try {
      let date: Date;
      if (typeof value === 'number') {
        const ms = value < 100000000000 ? value * 1000 : value;
        date = new Date(ms);
      } else {
        const numValue = Number(value);
        if (!isNaN(numValue) && value.trim() !== '') {
          const ms = numValue < 100000000000 ? numValue * 1000 : numValue;
          date = new Date(ms);
        } else {
          date = new Date(value);
        }
      }

      if (isNaN(date.getTime())) {
        return 'unknown';
      }

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch (e) {
      return 'unknown';
    }
  }

  ngOnInit(): void {
    this.getAllProfiles();
  }

  getAllProfiles(): void {
    this.profilesLoading = true;
    this.allProfiles = null;
    this.filteredProfiles = [];
    this.cdr.detectChanges();

    this.contactService.getProfiles().subscribe({
      next: (data) => {
        this.allProfiles = data;
        this.filteredProfiles = data;
        this.currentFilter = 'all';
        this.searchQuery = '';
        console.log('Fetched profiles successfully:', this.allProfiles);
        this.profilesLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.profilesLoading = false;
        this.allProfiles = null;
        this.cdr.detectChanges();
        alert('Failed To fetch profiles');
        console.error('Error fetching profiles:', err);
      }
    });
  }
}
