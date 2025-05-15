// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { InventoryService } from '../core/inventory.service';
// import { CommonModule } from '@angular/common';
// import { InvoiceService } from '../core/invoice.service';

// @Component({
//   selector: 'app-invoice',
//   templateUrl: './invoice.component.html',
//   styleUrls: ['./invoice.component.css'],
//   imports: [FormsModule, CommonModule, ReactiveFormsModule]
// })
// export class InvoiceComponent implements OnInit {
//   invoiceForm!: FormGroup;
//   inventoryItems: any[] = [];

//   constructor(private fb: FormBuilder
//     , private inventoryService: InventoryService
//     , private invoiceService: InvoiceService) {}
    
//   ngOnInit() {
//     this.invoiceForm = this.fb.group({
//       customerName: ['',],
//       contactNumber: [''],
//       items: this.fb.array([]),
//       discount: [0],
//       amount: [0],
//       discountAmount: [0],
//       netPayable: [0]
//     });

//     this.inventoryService.getAllMedicine().subscribe(data => {
//       this.inventoryItems = data;
//     });

//     this.addItem(); // start with one item
//   }

//   get items() {
//     return this.invoiceForm.get('items') as FormArray;
//   }

//   addItem() {
//     const item = this.fb.group({
//       itemName: [''],
//       strength: [''],
//       quantity: [0, Validators.required],
//       unitPrice: [0],
//       subTotal: [0]
//     });
//     this.items.push(item);
//   }

//   removeItem(index: number) {
//     this.items.removeAt(index);
//     this.calculateTotals();
//   }

//   onItemChange(index: number) {
//   const itemForm = this.items.at(index);
//   const selectedName = itemForm.get('itemName')?.value;
//   const selectedStrength = itemForm.get('strength')?.value;

//   const matchedInventory = this.inventoryItems.find(
//     item => item.itemName === selectedName && item.strength === selectedStrength
//   );

//   if (matchedInventory) {
//     itemForm.patchValue({
//       unitPrice: matchedInventory.sellPrice
//     });
//   }
// }

//   calculateRowSubTotal(index: number) {
//     const item = this.items.at(index);
//     const quantity = item.get('quantity')?.value || 0;
//     const price = item.get('unitPrice')?.value || 0;
//     const subTotal = quantity * price;

//     item.get('subTotal')?.setValue(subTotal, { emitEvent: false });

//     this.calculateTotals();
//   }

//   calculateTotals() {
//     let amount = 0;
//     this.items.controls.forEach(item => {
//       amount += item.get('subTotal')?.value || 0;
//     });

//     const discount = this.invoiceForm.get('discount')?.value || 0;
//     const discountAmount = amount * (discount / 100);
//     const netPayable = amount - discountAmount;

//     this.invoiceForm.patchValue({
//       amount,
//       discountAmount,
//       netPayable
//     });
//   }

//   onSubmit() {
//     if (this.invoiceForm.valid) {
//       console.log(this.invoiceForm.value); // Or send to backend
//     } else {
//       console.error("Form is invalid");
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../core/inventory.service';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../core/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  inventoryItems: any[] = [];
  isSubmitting = false; // Added loading state to prevent duplicate submissions

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadInventoryItems();
    this.addItem(); // Start with one empty item
  }

  // Initialize the form with proper structure
  private initializeForm(): void {
    this.invoiceForm = this.fb.group({
      customerName: [''], // Made non-required as requested
      contactNumber: [''],
      items: this.fb.array([]), // Will contain invoice items
      discount: [0],
      amount: [0],
      discountAmount: [0],
      netPayable: [0]
    });
  }

  // Load inventory items from service
  private loadInventoryItems(): void {
    this.inventoryService.getAllMedicine().subscribe(data => {
      this.inventoryItems = data;
    });
  }

  // Getter for items FormArray for cleaner template access
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Add a new empty item to the invoice
  addItem(): void {
    const item = this.fb.group({
      itemName: ['', Validators.required], // Made required for valid items
      strength: ['', Validators.required], // Made required for valid items
      quantity: [1, [Validators.required, Validators.min(1)]], // Must be at least 1
      unitPrice: [0, [Validators.required, Validators.min(0)]], // Must be >= 0
      subTotal: [0]
    });
    this.items.push(item);
  }

  // Remove item at specified index
  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateTotals(); // Recalculate totals after removal
  }

  // When item selection changes, update the price
  onItemChange(index: number): void {
    const itemForm = this.items.at(index);
    const selectedName = itemForm.get('itemName')?.value;
    const selectedStrength = itemForm.get('strength')?.value;

    // Find matching inventory item
    const matchedInventory = this.inventoryItems.find(
      item => item.itemName === selectedName && item.strength === selectedStrength
    );

    if (matchedInventory) {
      itemForm.patchValue({
        unitPrice: matchedInventory.sellPrice
      });
      this.calculateRowSubTotal(index); // Recalculate row total
    }
  }

  // Calculate subtotal for a specific row
  calculateRowSubTotal(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('unitPrice')?.value || 0;
    const subTotal = quantity * price;

    item.get('subTotal')?.setValue(subTotal, { emitEvent: false });
    this.calculateTotals(); // Update overall totals
  }

  // Calculate all totals (amount, discount, net payable)
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

  // Handle form submission
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.invoiceForm.markAllAsTouched();

    // Check if form is valid and not already submitting
    if (this.invoiceForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    if (this.isSubmitting) {
      return; // Prevent duplicate submissions
    }

    this.isSubmitting = true;

    // Prepare the invoice data
    const invoiceData = {
      ...this.invoiceForm.value,
      // Add any additional fields needed by your backend
      date: new Date().toISOString() // Example: add current date
    };

    // Send to backend service
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
        this.isSubmitting = false; // Reset loading state
      }
    });
  }

  // Reset the form to initial state
  private resetForm(): void {
    this.invoiceForm.reset({
      discount: 0,
      amount: 0,
      discountAmount: 0,
      netPayable: 0
    });
    this.items.clear();
    this.addItem(); // Start with fresh empty item
  }
}