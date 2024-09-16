export type CategoryName = 'Men' | 'Women' | 'Kids';
export type ColorName = 'Red' | 'Blue' | 'Green' | 'Yellow' | 'Black' | 'White';
export type OrderStatus = 
  | 'Pending'
  | 'Processing'
  | 'OnHold'
  | 'Shipped'
  | 'Delivered'
  | 'Completed'
  | 'Canceled'
  | 'Refunded'
  | 'Returned'
  | 'Failed';
  export type PaymentStatus = 
  | 'Pending'
  | 'Authorized'
  | 'Successful'
  | 'Declined'
  | 'Refunded'
  | 'PartiallyRefunded'
  | 'Failed'
  | 'Cancelled'
  | 'Expired';

export type SizeValue = 
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'ExtraLarge';

export type SubCategoryName = 
  | 'Casual'
  | 'Sports'
  | 'Formal'
  | 'Boots'
  | 'Sandals'
  | 'Sneakers'
  | 'Heels'
  | 'Running'
  | 'Training'
  | 'Comfort'
  | 'School';

export type UserRole = 
  | 'Admin'
  | 'User';

