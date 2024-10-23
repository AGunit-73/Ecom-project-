import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const categories = url.searchParams.get("categories"); // Category filters
  const priceRange = url.searchParams.get("priceRange"); // Price range filter
  const condition = url.searchParams.get("condition"); // Condition filter
  const sellerUsername = url.searchParams.get("sellerUsername"); // Seller filter

  try {
    const result = await ApiService.fetchItems({
      categories: categories ? categories.split(",").map(Number) : [],
      priceRange: priceRange ? priceRange.split(",").map(Number) : [0, 1000],
      condition: condition ? condition.split(",") : [],
      sellerUsername,
    });

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
