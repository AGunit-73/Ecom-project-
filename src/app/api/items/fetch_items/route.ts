import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const categories = url.searchParams.get("categories");
  const priceRange = url.searchParams.get("priceRange");
  const condition = url.searchParams.get("condition");
  const sellerUsername = url.searchParams.get("sellerUsername");

  try {
    // Convert filters into usable formats
    const parsedCategories = categories ? categories.split(",").map(Number) : [];
    const parsedCondition = condition ? condition.split(",") : [];

    // Ensure priceRange is an array of two elements [min, max]
    const parsedPriceRange: [number, number] = priceRange
      ? priceRange.split(",").map(Number) as [number, number]
      : [0, 1000]; // Default range

    // Fetch items using the API service with the filters
    const result = await ApiService.fetchItems({
      categories: parsedCategories,
      priceRange: parsedPriceRange, // Ensure it has two elements
      condition: parsedCondition,
      sellerUsername: sellerUsername || undefined,
    });

    // Check and return the result
    if (result.success) {
      return NextResponse.json({ success: true, items: result.items }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
