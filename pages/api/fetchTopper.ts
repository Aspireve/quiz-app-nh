import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Fetch top 10 users based on points
    const topUsers = await prisma.user.findMany({
      orderBy: {
        points: "desc", // Sort by points in descending order
      },
      take: 10, // Limit to top 10 users
      select: {
        uid: true, // Include user ID
        displayName: true, // Include user name if available
        points: true, // Include user points
        photoURL: true,
      },
    });

    res.status(200).json({
      message: "Top 10 users fetched successfully",
      topUsers,
    });
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
