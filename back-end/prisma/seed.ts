import dayjs from "dayjs";
import { prisma } from "../src/prisma/client";

async function main() {
  await prisma.product.deleteMany();
  await prisma.categories.deleteMany();

  const today = dayjs().startOf("day").toDate();

  const category = await prisma.categories.create({
    data: {
      name: "Orchids",
    },
  });

  const product = await prisma.product.create({
    data: {
      id: "clgkcxt9g0001yfaj7ltjb4i5",
      title: "Orchids Vandas",
      price: 120.0,
      description: "Product Orchids - Vandas",
      quantity: 20,
      imageUrl: {
        create: [
          {
            image_url:
              "https://orquidario.vercel.app/image/orchids/orquidea1.jpg",
          },
          {
            image_url:
              "https://orquidario.vercel.app/image/orchids/orquidea01.jpg",
          },
        ],
      },
      category_id: category.id,
      created_at: today,
    },
  });

  console.log("Product => ", product);
  console.log("Category =>", category);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
