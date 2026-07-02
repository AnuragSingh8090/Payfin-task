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

  showDeleteModal: boolean = false;
  deleteLoading: boolean = false;
  profileIdToDelete: number | null = null;

  editingProfileId: number | null = null;
  contactForm: ContactDto = {
    id: 0,
    first_name: '',
    last_name: '',
    emailId: '',
    age: '',
    gender: '',
    mobilenumber: '',
    pan_no: '',
    adhaar_no: '',
    status: true,
    createdAt: ''
  };
  formErrors: { [key: string]: string } = {};
  saveLoading: boolean = false;

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

  confirmDelete(id: number): void {
    this.profileIdToDelete = id;
    this.showDeleteModal = true;
    this.cdr.detectChanges();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.profileIdToDelete = null;
    this.deleteLoading = false;
    this.cdr.detectChanges();
  }

  executeDelete(): void {
    if (this.profileIdToDelete === null) return;
    this.deleteLoading = true;
    this.cdr.detectChanges();

    this.contactService.deleteProfile(this.profileIdToDelete).subscribe({
      next: () => {
        this.deleteLoading = false;
        this.showDeleteModal = false;
        this.profileIdToDelete = null;
        this.cdr.detectChanges();
        this.getAllProfiles();
        setTimeout(() => {
          alert('Profile deleted successfully');
        }, 100);
      },
      error: (err) => {
        this.deleteLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          alert('Failed to delete profile');
        }, 100);
        console.error('Error deleting profile:', err);
      }
    });
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
  startEdit(profile: ContactDto): void {
    this.editingProfileId = Number(profile.id);
    this.formErrors = {};
    this.contactForm = {
      id: Number(profile.id),
      first_name: profile.first_name,
      last_name: profile.last_name,
      emailId: profile.emailId,
      age: profile.age ?? '',
      gender: profile.gender || '',
      mobilenumber: profile.mobilenumber ?? '',
      pan_no: profile.pan_no || '',
      adhaar_no: profile.adhaar_no || '',
      status: profile.status === true || profile.status === 'true',
      createdAt: this.formatDateForInput(profile.createdAt)
    };
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    this.editingProfileId = null;
    this.resetForm();
    this.cdr.detectChanges();
  }

  resetForm(): void {
    this.contactForm = {
      id: 0,
      first_name: '',
      last_name: '',
      emailId: '',
      age: '',
      gender: '',
      mobilenumber: '',
      pan_no: '',
      adhaar_no: '',
      status: true,
      createdAt: ''
    };
    this.formErrors = {};
  }

  validateForm(): boolean {
    this.formErrors = {};
    const f = this.contactForm;

    if (!f.first_name || f.first_name.trim() === '') {
      this.formErrors['first_name'] = 'First Name is required';
    }

    if (!f.last_name || f.last_name.trim() === '') {
      this.formErrors['last_name'] = 'Last Name is required';
    }

    if (!f.emailId || f.emailId.trim() === '') {
      this.formErrors['emailId'] = 'Email is required';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(f.emailId)) {
        this.formErrors['emailId'] = 'Enter a valid email address';
      }
    }

    if (f.age === null || f.age === undefined || String(f.age).trim() === '') {
      this.formErrors['age'] = 'Age is required';
    } else {
      const ageNum = Number(f.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
        this.formErrors['age'] = 'Age must be between 1 and 150';
      }
    }

    if (!f.gender || f.gender.trim() === '') {
      this.formErrors['gender'] = 'Gender is required';
    }

    if (!f.mobilenumber || String(f.mobilenumber).trim() === '') {
      this.formErrors['mobilenumber'] = 'Mobile Number is required';
    } else {
      const mobileStr = String(f.mobilenumber).trim();
      if (mobileStr.length !== 10 || isNaN(Number(mobileStr))) {
        this.formErrors['mobilenumber'] = 'Must be exactly 10 digits';
      }
    }

    if (!f.pan_no || f.pan_no.trim() === '') {
      this.formErrors['pan_no'] = 'PAN Number is required';
    } else {
      const panPattern = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
      if (!panPattern.test(f.pan_no)) {
        this.formErrors['pan_no'] = 'Format: 5 letters, 4 digits, 1 letter';
      }
    }

    if (!f.adhaar_no || String(f.adhaar_no).trim() === '') {
      this.formErrors['adhaar_no'] = 'Aadhaar Number is required';
    } else {
      const adhaarStr = String(f.adhaar_no).trim();
      if (adhaarStr.length !== 12 || isNaN(Number(adhaarStr))) {
        this.formErrors['adhaar_no'] = 'Must be exactly 12 digits';
      }
    }

    this.cdr.detectChanges();
    return Object.keys(this.formErrors).length === 0;
  }

  validateField(field: string): void {
    const f = this.contactForm;
    delete this.formErrors[field];

    switch (field) {
      case 'first_name':
        if (!f.first_name || f.first_name.trim() === '') {
          this.formErrors['first_name'] = 'First Name is required';
        }
        break;
      case 'last_name':
        if (!f.last_name || f.last_name.trim() === '') {
          this.formErrors['last_name'] = 'Last Name is required';
        }
        break;
      case 'emailId':
        if (!f.emailId || f.emailId.trim() === '') {
          this.formErrors['emailId'] = 'Email is required';
        } else {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(f.emailId)) {
            this.formErrors['emailId'] = 'Enter a valid email address';
          }
        }
        break;
      case 'age':
        if (f.age === null || f.age === undefined || String(f.age).trim() === '') {
          this.formErrors['age'] = 'Age is required';
        } else {
          const ageNum = Number(f.age);
          if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
            this.formErrors['age'] = 'Age must be between 1 and 150';
          }
        }
        break;
      case 'gender':
        if (!f.gender || f.gender.trim() === '') {
          this.formErrors['gender'] = 'Gender is required';
        }
        break;
      case 'mobilenumber':
        if (!f.mobilenumber || String(f.mobilenumber).trim() === '') {
          this.formErrors['mobilenumber'] = 'Mobile Number is required';
        } else {
          const mobileStr = String(f.mobilenumber).trim();
          if (mobileStr.length !== 10 || isNaN(Number(mobileStr))) {
            this.formErrors['mobilenumber'] = 'Must be exactly 10 digits';
          }
        }
        break;
      case 'pan_no':
        if (!f.pan_no || f.pan_no.trim() === '') {
          this.formErrors['pan_no'] = 'PAN Number is required';
        } else {
          const panPattern = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
          if (!panPattern.test(f.pan_no)) {
            this.formErrors['pan_no'] = 'Format: 5 letters, 4 digits, 1 letter';
          }
        }
        break;
      case 'adhaar_no':
        if (!f.adhaar_no || String(f.adhaar_no).trim() === '') {
          this.formErrors['adhaar_no'] = 'Aadhaar Number is required';
        } else {
          const adhaarStr = String(f.adhaar_no).trim();
          if (adhaarStr.length !== 12 || isNaN(Number(adhaarStr))) {
            this.formErrors['adhaar_no'] = 'Must be exactly 12 digits';
          }
        }
        break;
    }
    this.cdr.detectChanges();
  }

  saveContact(): void {
    if (!this.validateForm()) {
      return;
    }

    this.contactForm.pan_no = this.contactForm.pan_no.toUpperCase().trim();
    this.saveLoading = true;

    if (this.editingProfileId === null) {
      this.contactService.createProfile(this.contactForm).subscribe({
        next: () => {
          this.saveLoading = false;
          this.resetForm();
          this.getAllProfiles();
        },
        error: (err) => {
          this.saveLoading = false;
          alert('Failed to save contact');
          console.error(err);
        }
      });
    } else {
      this.contactService.updateProfile(this.editingProfileId, this.contactForm).subscribe({
        next: () => {
          this.saveLoading = false;
          this.editingProfileId = null;
          this.resetForm();
          this.getAllProfiles();
        },
        error: (err) => {
          this.saveLoading = false;
          alert('Failed to update contact');
          console.error(err);
        }
      });
    }
  }

  toggleFormStatus(): void {
    this.contactForm.status = !this.contactForm.status;
    this.cdr.detectChanges();
  }

  formatDateForInput(value: string | number | undefined | null): string {
    const formatted = this.formatDate(value);
    return formatted === 'unknown' ? '' : formatted;
  }
}
