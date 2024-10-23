// // Example API route for categories
// import { NextResponse } from 'next/server';
// import ApiService from '@/app/api_service/index';

// export async function GET() {
//   try {
//     const result = await ApiService.fetchCategories();

//     if (result.success) {
//       return NextResponse.json({ success: true, categories: result.categories }, { status: 200 });
//     } else {
//       return NextResponse.json({ success: false, message: result.message }, { status: 500 });
//     }
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//   }
// }
