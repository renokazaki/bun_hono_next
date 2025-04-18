//開発用
// import { PrismaClient } from "@prisma/client";

//vercel用
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// .envから直接データベースURLを取得
const databaseUrl =
  "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjAzMjcyYzctYzNjYS00NWQzLTg4ZDktNjIwZmU2NTkzNTdjIiwidGVuYW50X2lkIjoiZjA4Y2Y2ZWRkYjY3OGQ5ZTgzYThiZGY5MmMyNzdjNzdmM2FkZTBjOGIwOTI0MGJiYTVmOGQ4YWY3ZjYwNmExZSIsImludGVybmFsX3NlY3JldCI6ImNiYzg1NzNmLTNjNWQtNDc1Zi05YzY0LWIzMjVkZGYwNjgwNSJ9.tOT0f2SLpM9edC4e3_mAUEE9JbK62_j8wS96aRotwp8";

// URLを直接指定してPrismaクライアントを初期化
const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
}).$extends(withAccelerate());

async function main() {
  const startTime = performance.now();

  // Learn more about caching strategies:
  // https://www.prisma.io/docs/accelerate/caching
  const cachedUsersWithPosts = await prisma.todo.findMany({
    // cacheStrategy: {
    //   swr: 30, // 30 seconds
    //   ttl: 60, // 60 seconds
    // },
  });

  const endTime = performance.now();

  // Calculate the elapsed time
  const elapsedTime = endTime - startTime;

  console.log(`The query took ${elapsedTime}ms.`);
  console.log(`It returned the following data: \n`, cachedUsersWithPosts);
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
