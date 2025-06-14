import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InventoryService } from '../core/inventory.service';
import { InvoiceService } from '../core/invoice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  inventoryItems: any[] = [];
  isSubmitting = false;
  companies: string[] = [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private invoiceService: InvoiceService
  ) {}

  //unique category
  get uniqueCategories(): string[] {
    const categories = this.inventoryItems.map((item) => item.category);
    return [...new Set(categories)];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInventoryItems();
    this.addItem(); // Start with one empty item
    this.inventoryService.getAllCompanies().subscribe((data) => {
      this.companies = data;
    });
  }

  private initializeForm(): void {
    this.invoiceForm = this.fb.group({
      customerName: [''],
      contactNumber: [''],
      items: this.fb.array([]),
      discount: [0],
      amount: [0],
      discountAmount: [0],
      netPayable: [0],
    });
  }

  private loadInventoryItems(): void {
    this.inventoryService.getAllMedicine().subscribe((data) => {
      this.inventoryItems = data;
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = this.fb.group({
      itemName: [''],
      category: [''], //IF NEED ADD Validators.required
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0],
      subTotal: [0],
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
    const category = itemForm.get('category')?.value;

    const matched = this.inventoryItems.find(
      (item) => item.itemName === itemName && item.category === category
    );

    if (matched) {
      itemForm.patchValue(
        { unitPrice: matched.sellPrice },
        { emitEvent: false }
      );
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
    this.items.controls.forEach((item) => {
      amount += item.get('subTotal')?.value || 0;
    });

    const discount = this.invoiceForm.get('discount')?.value || 0;
    const discountAmount = amount * (discount / 100);
    const netPayable = amount - discountAmount;

    this.invoiceForm.patchValue({
      amount,
      discountAmount,
      netPayable,
    });
  }

  getStrengthOptions(index: number): any[] {
    const itemName = this.items.at(index)?.get('itemName')?.value;
    return this.inventoryItems.filter((item) => item.itemName === itemName);
  }

  //chatGPT nosto code
  onSubmit(): void {
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const form = this.invoiceForm.value;
    const invoiceList = form.items.map((item: any) => ({
      customerName: form.customerName,
      contactNumber: form.contactNumber,
      itemName: item.itemName,
      category: item.category,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subTotal: item.subTotal,
      amount: form.amount,
      discount: form.discount,
      discountAmount: form.discountAmount,
      netPayable: form.netPayable,
    }));

    this.invoiceService.createInvoice(invoiceList).subscribe({
      next: (res) => {
        alert('Invoice(s) saved successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error saving invoice', err);
        alert('Error saving invoice.');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
  private resetForm(): void {
    this.invoiceForm.reset({
      discount: 0,
      amount: 0,
      discountAmount: 0,
      netPayable: 0,
    });
    this.items.clear();
    this.addItem();
  }
}
