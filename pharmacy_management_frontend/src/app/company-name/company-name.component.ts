import { Component, OnInit } from '@angular/core';
import { CompanyNameService } from '../core/company-name.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-name',
  imports: [FormsModule,CommonModule],
  templateUrl: './company-name.component.html',
  styleUrl: './company-name.component.css'
})
export class CompanyNameComponent implements OnInit {
  companyList: any[] = [];
  newCompany = { companyName: '' };

  constructor(private companyService: CompanyNameService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(data => {
      this.companyList = data;
    });
  }

  onSubmit(): void {
    if (!this.newCompany.companyName.trim()) return;

    this.companyService.addCompany(this.newCompany).subscribe({
      next: () => {
        this.loadCompanies();
        this.newCompany.companyName = '';
      },
      error: err => alert('Error adding company')
    });
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure?')) {
      this.companyService.deleteCompany(id).subscribe(() => {
        this.loadCompanies();
      });
    }
  }
}{

}
