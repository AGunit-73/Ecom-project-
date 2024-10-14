// import { NextResponse } from 'next/server';
// import ApiService from '@/app/api_service/index';

// export async function POST(request: Request) {
//   try {
//     const { usernameOrEmail, password } = await request.json();
//     console.log('Received login data:', { usernameOrEmail, password });

//     const result = await ApiService.authenticateUser(usernameOrEmail, password);

//     if (result.success) {
//       return NextResponse.json(
//         { success: true, message: result.message, user: result.user },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { success: false, message: result.message },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
