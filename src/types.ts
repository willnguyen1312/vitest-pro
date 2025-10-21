interface InvalidLineItem {
  id: string;
  lineItemId?: string | null;
}

interface ValidLineItem {
  id: string;
  lineItemId: string;
}

const invalidLineItems: InvalidLineItem[] = [
  {
    id: "123",
    lineItemId: null,
  },
  {
    id: "456",
    lineItemId: "789",
  },
];

// Type guard function to narrow the type
function isValidLineItem(item: InvalidLineItem): item is ValidLineItem {
  return typeof item.lineItemId === "string";
}

const validLineItems: ValidLineItem[] =
  invalidLineItems.filter(isValidLineItem);
