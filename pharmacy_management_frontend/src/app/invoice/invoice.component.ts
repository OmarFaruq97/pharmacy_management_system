import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../core/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  inventoryItems: any[] = [];

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      customerName: ['', Validators.required],
      contactNumber: [''],
      items: this.fb.array([]),
      discount: [0],
      amount: [0],
      discountAmount: [0],
      netPayable: [0]
    });

    this.inventoryService.getAllMedicine().subscribe(data => {
      this.inventoryItems = data;
    });

    this.addItem(); // start with one item
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      itemName: [''],
      strength: [''],
      quantity: [1, Validators.required],
      unitPrice: [0],
      subTotal: [0]
    });
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  onItemChange(index: number) {
  const itemForm = this.items.at(index);
  const selectedName = itemForm.get('itemName')?.value;
  const selectedStrength = itemForm.get('strength')?.value;

  const matchedInventory = this.inventoryItems.find(
    item => item.itemName === selectedName && item.strength === selectedStrength
  );

  if (matchedInventory) {
    itemForm.patchValue({
      unitPrice: matchedInventory.sellPrice
    });
  }
}


  calculateRowSubTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('unitPrice')?.value || 0;
    const subTotal = quantity * price;

    item.get('subTotal')?.setValue(subTotal, { emitEvent: false });

    this.calculateTotals();
  }

  calculateTotals() {
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

  onSubmit() {
    console.log(this.invoiceForm.value);
    // send to backend
  }
}