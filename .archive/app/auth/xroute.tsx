import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { nextUrl } = request;
  const searchParams = nextUrl.searchParams;
  let error = searchParams.get('error');
  if (error) {
    return NextResponse.redirect(
      'http://localhost:3000/auth/signin/' + error + '?back=' + searchParams.get('callbackUrl')
    );
  } else {
    return NextResponse.redirect(
      'http://localhost:3000/auth/signin' + '?back=' + searchParams.get('callbackUrl')
    );
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
