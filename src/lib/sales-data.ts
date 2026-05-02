export type SalesRecord = {
  month: string;
  year: 2022 | 2023 | 2024;
  sales: number;
  profit: number;
  orders: number;
  region: "East" | "West" | "South" | "Central";
  category: "Electronics" | "Furniture" | "Office Supplies" | "Fashion";
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const yearlySeeds = {
  2022: {
    sales: [18400, 22150, 20780, 23940, 26620, 25110, 27860, 29480, 31620, 33240, 36510, 39280],
    profit: [4120, 5080, 4620, 5360, 6010, 5740, 6330, 6880, 7420, 7810, 8460, 9140],
    orders: [142, 158, 151, 169, 181, 176, 193, 202, 218, 226, 244, 257],
  },
  2023: {
    sales: [24300, 26840, 25160, 28950, 31270, 33620, 35180, 37840, 39450, 42110, 45860, 49620],
    profit: [5480, 6240, 5930, 6890, 7440, 8060, 8310, 9140, 9560, 10120, 10940, 11880],
    orders: [168, 187, 179, 199, 214, 229, 238, 251, 264, 281, 303, 326],
  },
  2024: {
    sales: [31650, 34280, 36120, 38940, 42750, 45180, 47620, 50340, 48970, 53260, 57140, 61980],
    profit: [7350, 8020, 8460, 9180, 10150, 10820, 11360, 12140, 11690, 12880, 13940, 15120],
    orders: [214, 232, 245, 259, 287, 302, 318, 337, 329, 356, 382, 411],
  },
} satisfies Record<SalesRecord["year"], { sales: number[]; profit: number[]; orders: number[] }>;

const regions: SalesRecord["region"][] = ["East", "West", "South", "Central"];
const categories: SalesRecord["category"][] = ["Electronics", "Furniture", "Office Supplies", "Fashion"];

export const salesData: SalesRecord[] = ([2022, 2023, 2024] as const).flatMap((year) =>
  months.map((month, index) => ({
    month,
    year,
    sales: yearlySeeds[year].sales[index],
    profit: yearlySeeds[year].profit[index],
    orders: yearlySeeds[year].orders[index],
    region: regions[(index + year) % regions.length],
    category: categories[(index + year) % categories.length],
  })),
);

export const years = [2024, 2023, 2022] as const;

