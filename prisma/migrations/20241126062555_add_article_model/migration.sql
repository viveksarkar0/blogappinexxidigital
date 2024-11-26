-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
