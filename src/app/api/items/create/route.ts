// src/app/api/items/create/route.ts
import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';

export async function POST(request: Request) {
  try {
    const { vendorid, name, description, price, category, stockquantity } = await request.json();
    const result = await ApiService.addItem(vendorid, name, description, price, category, stockquantity);

    if (result.success) {
      return NextResponse.json(result.item, { status: 201 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
