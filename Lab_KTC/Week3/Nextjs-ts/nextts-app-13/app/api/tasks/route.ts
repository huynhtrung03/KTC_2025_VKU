import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if(!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch ("https://server.aptech.io/workspaces/tasks",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
        },
    });
    if(!response.ok) {
      return new NextResponse(
        JSON.stringify({ status: "error", message: "Failed to fetch profile" }),
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json({
        status: "success",
        message: "Profile fetched successfully", 
        data
    });
}
    catch (error) {
        return new NextResponse(
          JSON.stringify({ status: "error", message: "An error occurred: " +error }),  
            { status: 500 }
        );  
}
  }   