import prisma from "@/lib/db"; // Import Prisma client
import bcrypt from 'bcryptjs'// Import bcrypt for password hashing

export async function POST(req: Request) {
  try {
    // Parse the incoming request JSON
    const { username, email, password } = await req.json();

    // Check if the username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username is already taken.",
        }),
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email is already in use.",
        }),
        { status: 400 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
       
      },
    });
    console.log(newUser)

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error registering user.",
      }),
      { status: 500 }
    );
  }
}
