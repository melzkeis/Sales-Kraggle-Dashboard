import { salesData } from "@/lib/sales-data";

export async function GET() {
  return Response.json({
    source:
      "Mock data shaped after Kaggle e-commerce sales datasets with order date, category, region, sales, and profit fields.",
    data: salesData,
  });
}

