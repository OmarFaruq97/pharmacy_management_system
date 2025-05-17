import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { InventoryService } from '../core/inventory.service';
import { InvoiceService } from '../core/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  standalone: true,
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  inventoryItems: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInventoryItems();
    this.addItem(); // Start with one empty item
  }

  private initializeForm(): void {
    this.invoiceForm = this.fb.group({
      customerName: [''],
      contactNumber: [''],
      items: this.fb.array([]),
      discount: [0],
      amount: [0],
      discountAmount: [0],
      netPayable: [0]
    });
  }

  private loadInventoryItems(): void {
    this.inventoryService.getAllMedicine().subscribe(data => {
      this.inventoryItems = data;
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = this.fb.group({
      itemName: ['', Validators.required],
      strength: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0],
      subTotal: [0]
    });
    this.items.push(item);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  onItemChange(index: number): void {
    const itemForm = this.items.at(index);
    const itemName = itemForm.get('itemName')?.value;
    const strength = itemForm.get('strength')?.value;

    if (!itemName || !strength) return;

    const matched = this.inventoryItems.find(
      item => item.itemName === itemName && item.strength === strength
    );

    if (matched) {
      itemForm.patchValue({ unitPrice: matched.sellPrice }, { emitEvent: false });
      this.calculateRowSubTotal(index);
    } else {
      itemForm.patchValue({ unitPrice: 0, subTotal: 0 }, { emitEvent: false });
      this.calculateTotals();
    }
  }

  calculateRowSubTotal(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('unitPrice')?.value || 0;
    const subTotal = quantity * price;

    item.get('subTotal')?.setValue(subTotal, { emitEvent: false });
    this.calculateTotals();
  }

  calculateTotals(): void {
    let amount = 0;
    this.items.controls.forEach(item => {
      amount += item.get('subTotal')?.value || 0;
    });

    const discount = this.invoiceForm.get('discount')?.value || 0;
    const discountAmount = amount * (discount / 100);
    const netPayable = amount - discountAmount;

    this.invoiceForm.patchValue({
      amount,
      discountAmount,
      netPayable
    });
  }

  getStrengthOptions(index: number): any[] {
    const itemName = this.items.at(index)?.get('itemName')?.value;
    return this.inventoryItems.filter(item => item.itemName === itemName);
  }

  onSubmit(): void {
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const invoiceData = {
      ...this.invoiceForm.value,
      date: new Date().toISOString()
    };

    this.invoiceService.createInvoice(invoiceData).subscribe({
      next: (response) => {
        console.log('Invoice saved successfully', response);
        alert('Invoice saved successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error saving invoice', error);
        alert('Error saving invoice. Please try again.');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.invoiceForm.reset({
      discount: 0,
      amount: 0,
      discountAmount: 0,
      netPayable: 0
    });
    this.items.clear();
    this.addItem();
  }
}
