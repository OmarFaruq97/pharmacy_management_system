import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../core/invoice.service';

@Component({
  selector: 'app-invoice-history',  
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-history.component.html',
  styleUrl: './invoice-history.component.css'
})
export class InvoiceHistoryComponent implements OnInit {
  invoices: any[] = [];
  totalSales: number = 0;
  editInvoiceForm!: FormGroup;
  selectedInvoice: any = null;
  showModal: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.initForm(); // Initialize the empty form on component load
  }

  //  Form initialized without any validators
  initForm(): void {
    this.editInvoiceForm = this.fb.group({
      customerName: [''],
      contactNumber: [''],
      itemName: [''],      
      quantity: [0],
      unitPrice: [0],
      subTotal: [0],
      amount: [0],
      discount: [0],
      discountAmount: [0],
      netPayable: [0]
    });
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: data => {
        this.invoices = data;
        this.calculateTotalSales();
      },
      error: err => console.error('Error loading invoices', err)
    });
  }

  calculateTotalSales(): void {
    this.totalSales = this.invoices.reduce((sum, inv) => {
      return sum + (Number(inv.netPayable) || 0);
    }, 0);
  }

  openEditModal(invoice: any): void {
    this.selectedInvoice = invoice;
    this.editInvoiceForm.patchValue(invoice); 
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedInvoice = null;
  }

  updateInvoice(): void {
    const updatedData = this.editInvoiceForm.value;

    this.invoiceService.updateInvoice(this.selectedInvoice.invoiceNumber, updatedData).subscribe({
      next: () => {
        alert('Invoice updated successfully');
        this.closeModal();
        this.loadInvoices();
      },
      error: err => {
        console.error('Update failed', err);
        alert('Failed to update invoice');
      }
    });
  }

  deleteInvoice(invoiceNumber: string): void {
    if (confirm(`Are you sure you want to delete invoice: ${invoiceNumber}?`)) {
      this.invoiceService.deleteInvoice(invoiceNumber).subscribe({
        next: () => {
          alert('Invoice deleted');
          this.loadInvoices();
        },
        error: err => {
          console.error('Delete failed', err);
          alert('Invoice deleted');
          this.loadInvoices();
        }
      });
    }
  }
  
  downloadInvoiceReport(): void {
    this.invoiceService.downloadInvoiceHistoryReport().then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice-history.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }).catch(error => {
      console.error('Error downloading invoice report:', error);
      alert('Failed to download invoice report.');
    });
  }
}
