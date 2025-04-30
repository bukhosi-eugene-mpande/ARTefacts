import { NextRequest, NextResponse } from 'next/server';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import jwt from 'jsonwebtoken';

const CLIENT_ID = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!;
const USER_POOL_ID = process.env.NEXT_PUBLIC_USER_POOL_ID!;

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();

    const { data } = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${access_token}`
    ).then((res) => res.json());

    const decodedToken = jwt.decode(data.id_token) as { email: string };

    if (!decodedToken?.email) {
      return NextResponse.json(
        { error: 'Invalid Google ID token' },
        { status: 400 }
      );
    }

    const cognito = new CognitoIdentityServiceProvider();

    const authResponse = await cognito
      .adminInitiateAuth({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID,
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: decodedToken.email,
          PASSWORD: data.id_token, // this is a placeholder
        },
      })
      .promise();

    return NextResponse.json({ success: true, result: authResponse });
  } catch (err) {
    return NextResponse.json(
      { error: 'Auth failed', details: err },
      { status: 500 }
    );
  }
}
